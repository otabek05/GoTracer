package ipv4

import (
	"fmt"
	"gotrace/internal/model"
)

type IPV4Parser struct {}

func Net() *IPV4Parser {return &IPV4Parser{}}

func (i *IPV4Parser) Name() string {return "IPV4"}

func (i *IPV4Parser) Parse(data []byte) (*model.LayerInfo, []byte, error) {
	if len(data) < 20 {
		return  nil, nil, fmt.Errorf("ipv4 is too short")
	}

	 ihl := int(data[0]&0x0F) * 4
    protocol := data[9]

    src := fmt.Sprintf("%d.%d.%d.%d", data[12], data[13], data[14], data[15])
    dst := fmt.Sprintf("%d.%d.%d.%d", data[16], data[17], data[18], data[19])

    info := model.LayerInfo{
        Name: "IPv4",
        Fields: map[string]string{
            "Source":   src,
            "Destination": dst,
            "Protocol": fmt.Sprintf("%d", protocol),
        },
    }

    return &info, data[ihl:], nil

}
