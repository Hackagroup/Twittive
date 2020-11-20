const express = require('express')
const router = express.Router()
const request = require('request')
const logger = require('../../utils/logger')
//-- needs to be fixed
const tweet_body = "testing #codechella"

router.get('/', async (req, res) => {
    try {
        let client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
            //consumer_key: JIAFPvqYGh4Gl9rhFn4xahLKq
            consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
            access_token_key: req.query.access_token_key,
            access_token_secret: req.query.access_token_secret,
            //access_token_key: "701976306976759809-uKZnXURvfScQchei0uqRtb1pY3cbaVN",
            //access_token_secret: "6RaIKIwapFay5LzVHfEsJJOOkM5aNa0FtWzakPVLWHfdo"

        })
        client.post('statuses/update', { status: req.query.tweet_body }, function (error, tweet, response) {
            try {
                if (error) throw error;
                console.log(tweet);
                console.log(response);  // raw response object
            } catch (err) {
                logger.error(err.stack ? err.stack : JSON.stringify(err))
                return res.status(400).json({
                    message: 'Unknown error occurred!',
                })
            }
        });
    } catch (err) {
        logger.error(err.stack ? err.stack : JSON.stringify(err))
        return res.status(400).json({
            message: 'Unknown error occurred!',
        })
    }
})

module.exports = router
