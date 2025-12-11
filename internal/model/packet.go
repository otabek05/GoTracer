package model

type LayerInfo struct {
	Name   string `json:"name"`
	Fields map[string]string  `json:"fields"`
}

type ParsedPacket struct {
	Timestamp int64       `json:"timestamp"`
	Src       string      `json:"src"`
	Dst       string      `json:"dst"`
	Protocol  string      `json:"protocol"`
	Length    int         `json:"length"`
	Layers    []LayerInfo `json:"layers"`
	Raw       []byte      `json:"raw"`
}
