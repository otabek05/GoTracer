package udp

import (
	"encoding/binary"
	"fmt"
	"gotrace/internal/model"
)

type UDPParser struct{}

func New() *UDPParser { return &UDPParser{} }

func (p *UDPParser) Name() string { return "UDP" }

func (p *UDPParser) Parse(data []byte) (*model.LayerInfo, []byte, error) {
    if len(data) < 8 {
        return nil, nil, fmt.Errorf("udp header too short")
    }

    srcPort := binary.BigEndian.Uint16(data[0:2])
    dstPort := binary.BigEndian.Uint16(data[2:4])

    info := model.LayerInfo{
        Name: "UDP",
        Fields: map[string]string{
            "Source Port":      fmt.Sprintf("%d", srcPort),
            "Destination Port": fmt.Sprintf("%d", dstPort),
        },
    }

    return &info, data[8:], nil
}
