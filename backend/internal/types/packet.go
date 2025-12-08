package types

import "time"

type CapturedPacket struct {
	Timestamp time.Time `json:"time"`
	Interface string    `json:"interface"`

	SrcIP string `json:"src_ip"`
	DstIP string `json:"dst_ip"`

	SrcPort string `json:"src_port"`
	DstPort string `json:"dst_port"`

	Network   NetworkProtocol     `json:"network"`
	Transport TransportProtocol   `json:"transport"`
	App       ApplicationProtocol `json:"application"`

	Length  int    `json:"lenght"`
	Payload string `json:"payload"`
}
