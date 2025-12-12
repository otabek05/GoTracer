package capture

import (
	"gotracer/internal/parser"

	"github.com/google/gopacket"
	"github.com/google/gopacket/pcap"
)


type Engine struct {
	handle *pcap.Handle
	packet chan gopacket.Packet
	parser *parser.PacketParser
}

func New() *Engine {

	return &Engine{
		packet: make(chan gopacket.Packet, 200),
		parser: parser.New(),
	}
}

func (e *Engine) Start(wsChan *chan []byte) error {
	ifaces, _ := pcap.FindAllDevs()
	iface := ifaces[0]

	h, err := pcap.OpenLive(iface.Name, 65535, true, pcap.BlockForever)
	if err != nil {
		return err
	}

	e.handle = h
	e.handle.SetBPFFilter("tcp and port 80")
	go e.loop(wsChan, string(iface.Addresses[0].IP))

	return nil
}
