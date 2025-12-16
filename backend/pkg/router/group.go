package router

import (
	"net/http"
	"strings"
)

type Group struct {
	prefix string 
	router *Router
}


func (g *Group) fullPath(path string ) string {
	return g.prefix + "/" + strings.TrimLeft(path, "/")
}

func (g *Group) GET(path string , handler http.HandlerFunc) {
	g.router.GET(g.fullPath(path), handler)
}

func (g *Group) POST(path string , handler http.HandlerFunc) {
	g.router.POST(g.fullPath(path),handler)
}

func (g *Group) PUT(path string, handler http.HandlerFunc) {
	g.router.PUT(g.fullPath(path), handler)
}

func (g *Group) DELETE(path string, handler http.HandlerFunc) {
	g.router.DELETE(g.fullPath(path), handler)
}