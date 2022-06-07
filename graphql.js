const { ApolloServer, gql } = require('apollo-server');

let users = [
  {
    id: 0,
    firstname: 'Islam',
    lastname: 'Kortam',
    email: 'imkortam@gmail.com',
    isSuspended: false,
    dob: '20-11-1997',
  },
  {
    id: 1,
    firstname: 'Anas',
    lastname: 'Kortam',
    email: 'anas@gmail.com',
    isSuspended: true,
    dob: '27-5-1994',
  },
  {
    id: 2,
    firstname: 'Alaa',
    lastname: 'Kortam',
    email: 'alaa.aldine5@gmail.com',
    isSuspended: true,
    dob: '15-12-1990',
  },
  {
    id: 3,
    firstname: 'Ahmed',
    lastname: 'Kortam',
    email: 'ahmed.kortam@gmail.com',
    isSuspended: false,
    dob: '12-5-1988',
  },
  {
    id: 4,
    firstname: 'Magdi',
    lastname: 'Kortam',
    email: 'magdi.kortam@gmail.com',
    isSuspended: false,
    dob: '23-2-1989',
  },
  
];


let comments = [
  { id: 1, content: 'This a comment 1', user: users[2], date: '7-6-2022' },
  { id: 2, content: 'This a comment 2', user: users[1], date: '6-6-2022' },
  { id: 3, content: 'This a comment 3', user: users[3], date: '5-6-2022' },
  { id: 4, content: 'This a comment 4', user: users[4], date: '7-6-2022' },
];


let articles = [
  {
    id: 1,
    title: 'This is article 1',
    body: 'Article 1 Body',
    date: '7-6-2022',
    author: users[0],
    comments: [comments[0]],
  },
  {
    id: 2,
    title: 'This is article 2',
    body: 'Article 2 Body',
    date: '6-6-2022',
    author: users[1],
    comments: [comments[1]],
  },
];


const schema = `
type User {
  id:ID!
  firstname:String!
  lastname:String!
  email:String
  dob:String
  isSusbended:Boolean
  articles:[Article]    
}
    
type Comment {
  id:ID!
  content:String!
  date:String!
  user:User
}

type Article {
  id:ID!
  title:String!
  body:String!
  content:String
}

type Query {
  allUsers: [User]
  allArticles:[Article]
  allComments: [Comment]
}

type Mutation {
  deleteArticle (id: Int): [Article]
  createArticle(id: Int, title: String, body:String, author:Int): [Article]
}`;

const resolvers = {
  Query: {
    allArticles: (_, { last }) => {
      if (!last){
        //Early Return
        return articles;
      }

      return articles.slice(articles.length - last);
    },
  },

  Mutation: {
    deleteArticle: (_, { articleId }) => {
      articles = articles.filter((article) => article.id !== articleId);
      return articles;
    },
    
    createArticle: (_, {articleId, title, body, content, author}) => {
      articles.push({
        articleId,
        title,
        body,
        content,
        author: users.filter((user) => user.id === author)[0],
      });
      return articles;
    },
  },
};

const typeDefs = gql(schema);
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4200).then(({ url }) => {
  console.log(`url is ${url}`);
});