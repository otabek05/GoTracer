package router

import "net/http"

type Router struct {
	mux *http.ServeMux
}

func NewRouter() *Router {
	return &Router{mux: http.NewServeMux()}
}

func (r *Router) ServerHTTP(w http.ResponseWriter, req *http.Request) {
	LoggingMiddleware(r.mux).ServeHTTP(w, req)
}

func (r *Router) GET(path string, handler http.HandlerFunc) {
	r.mux.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			handler(w, r)
		} else {
			http.NotFound(w, r)
		}
	})
}

func (r *Router) POST(path string, hander http.HandlerFunc) {
	r.mux.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			hander(w, r)
		} else {
			http.NotFound(w, r)
		}
	})
}

func (r *Router) PUT(path string, handler http.HandlerFunc) {
	r.mux.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPut {
			handler(w, r)
		} else {
			http.NotFound(w, r)
		}
	})
}

func (r *Router) DELETE(path string, handler http.HandlerFunc) {
	r.mux.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodDelete {
			handler(w, r)
		} else {
			http.NotFound(w, r)
		}
	})
}

func (r *Router) Group(prefix string) *Group {
	return &Group{
		prefix: prefix,
		router: r,
	}
}
