package parser

import "gotrace/internal/parser/ethernet"

func getNextParser(data []byte) Parser {
    // Start with Ethernet for now
    return ethernet.New()
}