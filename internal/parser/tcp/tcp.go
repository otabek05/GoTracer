package tcp

import (
	"encoding/binary"
	"fmt"
	"gotrace/internal/model"
)

type TCPParser struct{}

func New() *TCPParser { return &TCPParser{} }

func (p *TCPParser) Name() string { return "TCP" }

func (p *TCPParser) Parse(data []byte) (*model.LayerInfo, []byte, error) {
    if len(data) < 20 {
        return nil, nil, fmt.Errorf("tcp header too short")
    }

    srcPort := binary.BigEndian.Uint16(data[0:2])
    dstPort := binary.BigEndian.Uint16(data[2:4])

    headerLen := int((data[12] >> 4) * 4)

    info := model.LayerInfo{
        Name: "TCP",
        Fields: map[string]string{
            "Source Port":      fmt.Sprintf("%d", srcPort),
            "Destination Port": fmt.Sprintf("%d", dstPort),
        },
    }

    return &info, data[headerLen:], nil
}
