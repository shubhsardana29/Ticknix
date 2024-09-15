import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default (app: Application) => {
  app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
  app.use('/events', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
  app.use('/tickets', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
  app.use('/users', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));
  app.use('/payments', createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true }));
  app.use('/admin', createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));
};