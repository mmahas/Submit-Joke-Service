/**
 * @openapi
 * /submit:
 *   post:
 *     tags:
 *       - Jokes
 *     summary: Create a new joke
 *     description: Creates a new joke with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JokeInputDto'
 *     responses:
 *       201:
 *         description: Joke created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JokeIdResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /submit:
 *   get:
 *     tags:
 *       - Jokes
 *     summary: Retrieve a joke for moderation
 *     description: Retrieves the next joke available for moderation with pagination support.
 *     responses:
 *       200:
 *         description: Successfully retrieved joke
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 joke:
 *                   $ref: '#/components/schemas/Joke'
 *                 totalJokes:
 *                   type: integer
 *       404:
 *         description: No jokes available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /submit/{_jokeId}:
 *   patch:
 *     tags:
 *       - Jokes
 *     summary: Update an existing joke
 *     description: Updates the joke with the given ID using the provided data.
 *     parameters:
 *       - name: _jokeId
 *         in: path
 *         required: true
 *         description: The ID of the joke to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JokeInputDto'
 *     responses:
 *       200:
 *         description: Joke updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Joke not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /submit/{_jokeId}:
 *   delete:
 *     tags:
 *       - Jokes
 *     summary: Delete a joke
 *     description: Deletes the joke with the given ID.
 *     parameters:
 *       - name: _jokeId
 *         in: path
 *         required: true
 *         description: The ID of the joke to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     JokeInputDto:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Type of the joke
 *         content:
 *           type: string
 *           description: Content of the joke
 *       required:
 *         - type
 *         - content
 *     JokeIdResponse:
 *       type: object
 *       properties:
 *         jokeId:
 *           type: string
 *           description: The ID of the created joke
 *     Joke:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the joke
 *         type:
 *           type: string
 *           description: Type of the joke
 *         content:
 *           type: string
 *           description: Content of the joke
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         error:
 *           type: string
 *           description: Error details
 */
