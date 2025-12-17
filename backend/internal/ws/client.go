package ws

import (
	"encoding/json"
	"fmt"
	"gotracer/internal/capture"
	"gotracer/internal/model"

	"github.com/gorilla/websocket"
)

type Client struct {
	conn   *websocket.Conn
	engine *capture.Engine
	IP     string
}

func (c *Client) read() {
	defer func() {
		DefaultHub.unregister <- c
	}()

	for {
		_, msg, err := c.conn.ReadMessage()
		if err != nil {
			return
		}

		var wsMessage model.WebSocketRX
		err = json.Unmarshal(msg, &wsMessage)
		if err != nil {
			fmt.Println(err)
			continue
		}

		switch wsMessage.Type {
		case "start_capturing":
			c.engine.Start(&wsMessage)
		case "stop_capturing":
			c.engine.Stop()
		}

		fmt.Println(wsMessage)

	}
}



func (c *Client) stop() {
	c.conn.Close()
	c.engine.Stop()
}
