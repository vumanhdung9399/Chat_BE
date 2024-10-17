// swaggerDefinitions.js

/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: User ID
 *          name:
 *            type: string
 *            description: User's name
 */

/**
 *  @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      LoginRequest:
 *        type: object
 *        require:
 *          - username
 *          - password
 *        properties:
 *          username:
 *            type: string
 *            example: "user123"
 *          password:
 *            type: string
 *            example: "password123"
 *      TokenResponse:
 *        type: object
 *        properties:
 *          accessToken:
 *            type: string
 *            example: "eyJhbGcijffnanfjeojfnaunfenainfei"
 *      AuthRequest:
 *        type: object
 *        required:
 *          - accessToken
 *        properties:
 *          accessToken:
 *            type: string
 *            example: "eyJhbGcijffnanfjeojfnaunfenainfei"
 */

/**
 *  @swagger
 *  /login:
 *    post:
 *      summary: Dang nhap he thong
 *      requestBody:
 *        description: Thong tin dang nhap
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: "dungvm8"
 *                password:
 *                  type: string
 *                  format: password
 *                  example: "12345678"
 *      responses:
 *        '200':
 *          description: Dang nhap thanh cong
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: string
 *                    example: "eyJhbGcijffnanfjeojfnaunfenainfei"
 *                  refreshToken:
 *                    type: string
 *                    example: "eyJhbGcijffnanfjeojfnau"
 *        '401':
 *          descriotion: Thong tin dang nhap khong dung
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Ten nguoi dung hoac mat khau khong dung"
 */

/**
 *  @swagger
 *  /register:
 *    post:
 *      summary: Dang ky tai khoan
 *      requestBody:
 *        description: Thong tin dang ky
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: "dungvm8"
 *                email:
 *                  type: string
 *                  example: "dungvm8@gmail.com"
 *                password:
 *                  type: string
 *                  format: password
 *                  example: "12345678"
 *                re-password:
 *                  type: string
 *                  format: password
 *                  example: "12345678"
 *      responses:
 *        '200':
 *          description: Dang ky thanh cong
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                    example: 200
 *                  data:
 *                    type: array
 *                    example: []
 *                  message:
 *                    type: string
 *                    example: "Successful"
 *        '500':
 *          description: Dang ky that bai
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                    example: 500
 *                  data:
 *                    type: array
 *                    example: []
 *                  message:
 *                    type: string
 *                    example: "Internal Server Error"
 */

/**
 *  @swagger
 *  /user:
 *    get:
 *      summary: Thong tin user
 *      responses:
 *        '200':
 *          description: Lay thong tin user thanh cong
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  username:
 *                    type: string
 *                    example: "dungvm8"
 *                  email:
 *                    type: string
 *                    example: "dungvm8@fpt.com"
 *                  password:
 *                    type: string
 *                    example: "fkdnfkefkafwea"
 *                  phone:
 *                    type: number
 *                    example: 0386132297
 *                  fullName:
 *                    type: string
 *                    example: "Vu Manh Dung"
 *                  is_active:
 *                    type: boolean
 *                    example: false
 *                  is_reported:
 *                    type: boolean
 *                    example: false
 *                  is_blocked:
 *                    type: boolean
 *                    example: false
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *                  updatedAt:
 *                    type: string
 *                    example: date-time
 *        '401':
 *          descriotion: Invalid credentials
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid credentials"
 */
