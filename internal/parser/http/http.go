package http


import (
    "bytes"
    "gotrace/internal/model"
)

type HTTPParser struct{}

func New() *HTTPParser { return &HTTPParser{} }

func (p *HTTPParser) Name() string { return "HTTP" }

func (p *HTTPParser) Parse(data []byte) (*model.LayerInfo, []byte, error) {
    if !bytes.Contains(data, []byte("\r\n\r\n")) {
        return nil, nil, nil // Not HTTP
    }

    info := model.LayerInfo{
        Name:   "HTTP",
        Fields: map[string]string{
            "Payload": string(data),
        },
    }

    return &info, nil, nil
}
