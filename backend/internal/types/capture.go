package types

type StartCaptureRequest struct {
	Interface   string                `json:"interface"`
	Network     []NetworkInterface    `json:"network"`
	Transport   []TransportProtocol   `json:"transport"`
	Application []ApplicationProtocol `json:"application"`
}

type StopCaptureRequest struct {
	Force bool `json:"force"`
}

type CaptureStatus struct {
	Running bool `json:"running"`
	Interface string `json:"interface"`
}