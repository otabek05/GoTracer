package parser

import "gotrace/internal/model"

type Parser interface {
	Name() string 
	Parse(data []byte) (*model.LayerInfo, []byte, error) 
}

func ParsePacket(raw []byte) ([]model.LayerInfo, error) {
	layers := []model.LayerInfo{}
	remaining := raw

	 for {
        p := getNextParser(remaining)
        if p == nil {
            break
        }

        layer, next, err := p.Parse(remaining)
        if err != nil {
            break
        }

        layers = append(layers, *layer)
        remaining = next
    }

    return layers, nil
}