package types

type NetworkProtocol string

const (
	NetworkIPv4 NetworkProtocol = "IPv4"
	NetworkIPv6 NetworkProtocol = "IPv6"
	NetworkARP  NetworkProtocol = "ARP"
)


type TransportProtocol string 

const (
	TransportTCP TransportProtocol = "TCP"
	TransportUDP TransportProtocol = "UDP"
	TransportICMP TransportProtocol = "ICMP"
)



type ApplicationProtocol string

const (
	AppHTTP  ApplicationProtocol = "HTTP"
	AppHTTPS ApplicationProtocol = "HTTPS"
	AppDNS   ApplicationProtocol = "DNS"
	AppFTP   ApplicationProtocol = "FTP"
	AppSSH   ApplicationProtocol = "SSH"
)