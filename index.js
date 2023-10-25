
const posts = require('./posts.json');
const topicjson = require('./topics.json');
const votes = require('./votes.json');





// Find the top 5 topics with the most number of posts
// [
//     {name: 'Topic 1', count: 34}
// ]

const topics = {};
function topicsWithVotes(posts) {
    posts.forEach((post) => {
        const topic = post.topicId;
        if(topics[topic]) {
            topics[topic] += 1;
        }
        else {
            topics[topic] = 1;
        }
    });
}

topicsWithVotes(posts);

const result = topicjson.map(topic => {
    const id = topic.id;
    const count = topics[id];
    return { name: topic.name, count: count };
});

result.sort((a, b)=> b.count - a.count);

const top5TopicsWithMostPosts = result.slice(0, 5);
console.log(top5TopicsWithMostPosts);








// Find the top 3 posts with the highest score. A post's score is calculated by calculating the total number of upvotes and subtracting the total number of downvotes

const postsScore = {};

function votingScore(votes) {
    votes.forEach(vote => {
        if(vote.type === 'up') {
            if(postsScore[vote.postId]) {
                postsScore[vote.postId] += 1;
            }
            else {
                postsScore[vote.postId] = 1;
            }
        }

        else {
            if(postsScore[vote.postId]) {
                postsScore[vote.postId] -= 1;
            }
            else {
                postsScore[vote.postId] = -1;
            }
        }
    });
}

votingScore(votes);

const top3PostsScore = Object.entries(postsScore) 
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

console.log(top3PostsScore);









// Find the top 5 most active users. A user gets 5 points each time they create a post. And then they get 1 point per each upvote / downvote

const userScore = {};

function doingPosts(posts) {
    posts.forEach(post => {
        const uid = post.userId;
        if(userScore[uid]) {
            userScore[uid] += 5;
        }
        else {
            userScore[uid] = 5;
        }
    });
}

doingPosts(posts);

function doingVotes(votes) {
    votes.forEach(vote => {
        const uid = vote.userId;
        if(userScore[uid]) {
            userScore[uid] += 1;
        }
        else {
            userScore[uid] = 1;
        }
    });
}

doingVotes(votes);

const top5MostActiveUsers = Object.entries(userScore) 
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

console.log(top5MostActiveUsers);









// Find the top 5 users who have created the most number of posts

const userPostsCount = {};

function countingPosts(posts) {
    posts.forEach(post => {
        const uid = post.userId;
        if(userPostsCount[uid]) {
            userPostsCount[uid] += 1;
        }
        else {
            userPostsCount[uid] = 1;
        }
    });
}

countingPosts(posts);

const top5UsersWithMostPosts = Object.entries(userPostsCount)
    .sort((a,b) => b[1] - a[1])
    .slice(0, 5);

console.log(top5UsersWithMostPosts);