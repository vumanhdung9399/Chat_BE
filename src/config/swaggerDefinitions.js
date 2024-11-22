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
 *    schemas:
 *      Contact:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: User ID
 *            example: 1
 *          username:
 *            type: string
 *            description: name
 *            example: "dungvm8"
 *          email:
 *            type: string
 *            description: Email
 *            example: "dungvm8@fpt.com"
 *          phone:
 *            type: integer
 *            description: Phone number
 *            example: 386132297
 *          fullName:
 *            type: string
 *            description: name
 *            example: "vu manh dung"
 *          avatar:
 *            type: string
 *            description: Avatar
 *            example: "http://google.com"
 *          isOnline:
 *            type: boolean
 *            description: Online
 *            example: true
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      ContactConfirm:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: User ID
 *            example: 1
 *          username:
 *            type: string
 *            description: name
 *            example: "dungvm8"
 *          email:
 *            type: string
 *            description: Email
 *            example: "dungvm8@fpt.com"
 *          phone:
 *            type: integer
 *            description: Phone number
 *            example: 386132297
 *          fullName:
 *            type: string
 *            description: name
 *            example: "vu manh dung"
 *          avatar:
 *            type: string
 *            description: Avatar
 *            example: "http://google.com"
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
 *                  status:
 *                    type: number
 *                    example: 200
 *                  data:
 *                    type: object
 *                    example:
 *                      accessToken: "eyJhbGcijffnanfjeojfnaunfenainfei"
 *                      refreshToken: "eyJhbGcijffnanfjeojfnau"
 *                  message:
 *                    type: string
 *                    example: "Successful"
 *        '401':
 *          description: Thong tin dang nhap khong dung
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
 *                fullName:
 *                  type: string
 *                  example: "string"
 *                password:
 *                  type: string
 *                  format: password
 *                  example: "12345678"
 *                re_password:
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
 *                    example: "Loi he thong, vui long thu lai"
 */

/**
 *  @swagger
 *  /refresh-token:
 *    post:
 *      summary: lay lai token
 *      requestBody:
 *        description: refresh token
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                refreshToken:
 *                  type: string
 *                  example: "dfjabfbefhuajbfaeufewbfejfj"
 *      responses:
 *        '200':
 *          description: refresh token thanh cong
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                    example: 200
 *                  data:
 *                    type: object
 *                    example:
 *                      accessToken: "jfnejfenjenadfjfjejfejb"
 *                  message:
 *                    type: string
 *                    example: "Successful"
 *        '401':
 *          description: Token khong hop le
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Token khong hop le"
 */

/**
 *  @swagger
 *  /logout:
 *    post:
 *      summary: Dang xuat
 *      responses:
 *        '200':
 *          description: Dang xuat thanh cong
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
 *                    example: "Dang xuat thanh cong"
 *        '401':
 *          description: Invalid credentials
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid credentials"
 */

/**
 *  @swagger
 *  /change-password:
 *    post:
 *      summary: Thay doi mat khau
 *      requestBody:
 *        description: Thong tin thay doi password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                old_password:
 *                  type: string
 *                  example: "12345678"
 *                new_password:
 *                  type: string
 *                  format: password
 *                  example: "123456789"
 *                re_password:
 *                  type: string
 *                  format: password
 *                  example: "123456789"
 *      responses:
 *        '200':
 *          description: Doi mat khau thanh cong
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
 *                    example: "Doi mat khau thanh cong"
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
 *                    example: "Loi he thong, vui long thu lai"
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
 *                    format: date-time
 *        '401':
 *          description: Invalid credentials
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid credentials"
 */


/**
 *  @swagger
 *  /contact/add:
 *    post:
 *      summary: Them lien he
 *      requestBody:
 *        description: Them lien he
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users_id:
 *                  type: number
 *                  example: 1
 *                email:
 *                  type: string
 *                  example: "dungvm9@fpt.com"
 *      responses:
 *        '200':
 *          description: Them lien he thanh vong
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                    example: 200
 *                  data:
 *                    type: object
 *                    example:
 *                      id: "1"
 *                      fullName: "vu manh dung"
 *                      email: "dungvm8@fpt.com"
 *                      phone: 0386132297
 *                      createdAt: "2024-10-30T09:52:22.073Z"
 *                      updatedAt: "2024-10-30T09:52:22.073Z"
 *                  message:
 *                    type: string
 *                    example: "Them lien he thanh cong"
 *        '500':
 *          description: error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Loi he thong, vui long thu lai"
 */


/**
 *  @swagger
 *  /contact/list:
 *    get:
 *      summary: Danh sach contact
 *      responses:
 *        '200':
 *          description: Lay danh sach contact thanh cong
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
 *                    items:
 *                      $ref: '#/components/schemas/Contact'
 *        '500':
 *          description: error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Loi he thong, vui long thu lai"
 */

/**
 *  @swagger
 *  /contact/list-wait-conf:
 *    get:
 *      summary: Danh sach contact wait confirm
 *      responses:
 *        '200':
 *          description: Lay danh sach contact thanh cong
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
 *                    items:
 *                      $ref: '#/components/schemas/ContactConfirm'
 *        '500':
 *          description: error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Loi he thong, vui long thu lai"
 */

/**
 *  @swagger
 *  /contact/list-send:
 *    get:
 *      summary: Danh sach contact send
 *      responses:
 *        '200':
 *          description: Lay danh sach contact thanh cong
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
 *                    items:
 *                      $ref: '#/components/schemas/ContactConfirm'
 *        '500':
 *          description: error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Loi he thong, vui long thu lai"
 */

/**
 *  @swagger
 *  /contact/delete:
 *    post:
 *      summary: Xoa lien he
 *      requestBody:
 *        description: Xoa lien he
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users_id:
 *                  type: number
 *                  example: 1
 *      responses:
 *        '200':
 *          description: Xoa lien he thanh cong
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
 *                    example: "Xoa lien he thanh cong"
 *        '500':
 *          description: error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Loi he thong, vui long thu lai"
 */