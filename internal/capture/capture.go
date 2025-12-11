package capture

import (
	"github.com/google/gopacket"
	"github.com/google/gopacket/pcap"
)


type Engine struct {
	handle *pcap.Handle
	packets chan gopacket.Packet
}

func New() *Engine {
	return &Engine{
		packets: make(chan gopacket.Packet, 200),
	}
}

func (e *Engine) Start(iface *pcap.Interface) error {
	ip := iface.Addresses[0].IP
	h, err := pcap.OpenLive(ip.String(), 65535, true, pcap.BlockForever)
	if err != nil {
		return err
	}

	e.handle = h
	go e.loop()
	
	return nil
}


func (e *Engine) loop() {
	src := gopacket.NewPacketSource(e.handle, e.handle.LinkType())
	for p := range src.Packets() {
		e.packets <- p
	}
}

func (e *Engine) Packet() <-chan gopacket.Packet {
	return e.packets
}

func (e *Engine) Stop() {
	if (e.handle != nil) {
		e.handle.Close()
	}
}

