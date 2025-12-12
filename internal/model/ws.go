package model

type WSIncomingMessage struct {
	Type    string `json:"type"`    
	Message any    `json:"message"` 

	TrafficOptions string `json:"trafficOptions"` 
	NetworkLayer   string `json:"networkLayer"`   
	Transport      string `json:"transport"`    

}
