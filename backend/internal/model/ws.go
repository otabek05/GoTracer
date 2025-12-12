package model

type WSReceiveMessage struct {
	Type    string `json:"type"`    
	Message any    `json:"message"` 
	TrafficOptions string `json:"trafficOptions"` 
	NetworkLayer   string `json:"networkLayer"`   
	Transport      string `json:"transport"`    
}


type WSSendingMessage struct {
	Type string `json:"type"`
	Packets *ParsedPacket `json:"packets,omitempty"`
}