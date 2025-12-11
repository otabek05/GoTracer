package ethernet

import (
	"encoding/binary"
	"fmt"
	"gotrace/internal/model"
)

type EthernetParser struct{}

func New() *EthernetParser { return &EthernetParser{} }

func (e *EthernetParser) Name() string { return "Ethernet" }

func (e *EthernetParser) Parse(data []byte) (*model.LayerInfo, []byte, error) {
	if len(data) < 14 {
		return nil, nil, fmt.Errorf("ethernet frame is too short")
	}

	

	dst := fmt.Sprintf("%02x:%02x:%02x:%02x:%02x:%02x",
		data[0], data[1], data[2], data[3], data[4], data[5])
	src := fmt.Sprintf("%02x:%02x:%02x:%02x:%02x:%02x",
		data[6], data[7], data[8], data[9], data[10], data[11])
	
	ethType := binary.BigEndian.Uint16(data[12:14])

	info := model.LayerInfo{
		Name: e.Name(),
		Fields: map[string]string{
			"Source": src,
			"Destination": dst,
			"Type": fmt.Sprintf("0x%x", ethType),
		},
	}

	return &info, data[14:], nil

}
