package types

type WSMessageType string 


const (
	WSMessagePacket WSMessageType = "PACKET"
	WSMessageScan WSMessageType = "SCAN_RESULT"
	WSMessageStatus WSMessageType = "STATUS"
	WSMessageError WSMessageType = "ERROR"
)

type WSMessage struct {
	Type WSMessageType `json:"type"`
	Data any `json:"data"`
}


