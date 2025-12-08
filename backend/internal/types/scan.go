package types


type ScanType string 

const (
	ScanHost ScanType = "HOST_SCAN"
	ScanPort ScanType = "PORT_SCAN"
)


type ScanRequest struct {
	Type ScanType `json:"type"`
	Target string `json:"target"`
	Ports  []int `json:"ports,omitempty"`
	Interface string `json:"interface"`
}


type ScanResult struct {
	Host string `json:"host"`
	Port string `json:"port"`
	Alive bool `json:"alive"`
	Open bool `json:"open"`
}