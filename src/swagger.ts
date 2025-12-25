import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { Express } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const setupSwagger = (app: Express) => {
    try {
        const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'))
        const options = {
            explorer: true,
            customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info { margin: 50px 0 }
        .swagger-ui .scheme-container { background: #fafafa; padding: 20px; }
      `,
            customSiteTitle: "Bot Estoque API Documentation",
            swaggerOptions: {
                persistAuthorization: true,
                displayRequestDuration: true,
                filter: true,
                syntaxHighlight: {
                    theme: "monokai"
                }
            }
        }
        app.use('/docs', swaggerUi.serve)
        app.get('/docs',  swaggerUi.setup(swaggerDocument, options))
        app.get('/docs.yaml', (req, res) => {
            res.setHeader('Content-Type', 'text/yaml')
            res.sendFile(path.join(__dirname, '../docs/openapi.yaml'))
        })
        app.get('/docs.json', (req, res) => {
            res.json(swaggerDocument)
        })
        console.log('Swagger UI disponível em: http://localhost:3000/docs')
        console.log('OpenAPI YAML: http://localhost:3000/docs.yaml')
        console.log('OpenAPI JSON: http://localhost:3000/docs.json')
    } catch (error) {
        console.error('Erro ao carregar documentação Swagger:', error)
    }
}

export default setupSwagger