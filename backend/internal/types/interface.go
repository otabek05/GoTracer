package types

type NetworkInterface struct {
	Name         string   `json:"name"`
	MTU          int      `json:"mtu"`
	HardwareAddr string   `json:"mac"`
	Addresses    []string `json:"addresses"`
	IsUp         bool     `json:"is_up"`
}
