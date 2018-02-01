const express = require('express');
const app = express();

const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let forumData = {
    title : "Responsive Forum",
    users : [
        {
            id : 1,
            name : "John Doe"
        },
        {
            id : 2,
            name : "Bruce Wayne"
        },
        {
            id : 3,
            name : "Deniz Simsek"
        }
    ],
    categories : [
        {
            title : "Technology",
            route : "tech",
            sub_categories : [
                {
                    title : "General",
                    route : "general",
                    description : "Everything about technology.",
                    posts : [
                        {
                            route : "first-post",
                            pinned : false,
                            posted_by : "John Doe",
                            title : "First post",
                            content : "Hey guys! This forum is awesome!",
                            replies : [
                                {
                                    replied_by : "Bruce Wayne",
                                    content : "Man! Your are most right."
                                },
                                {
                                    replied_by : "Deniz Simsek",
                                    content : "Definitely!"
                                }
                            ]
                        },
                        {
                            route : "second-post",
                            pinned : false,
                            posted_by : "Bruce Wayne",
                            title : "Second post",
                            content : "Hey guys! This forum is awesome!",
                            replies : [
                                {
                                    replied_by : "Deniz Simsek",
                                    content : "Man! Your are most right."
                                },
                                {
                                    replied_by : "John Doe",
                                    content : "Definitely!"
                                }
                            ]
                        },
                        {
                            route : "hello-guys",
                            pinned : true,
                            posted_by : "Deniz Simsek",
                            title : "Hello Guys!",
                            content : "Hey guys! This forum is awesome!",
                            replies : [
                                {
                                    replied_by : "Deniz Simsek",
                                    content : "Man! Your are most right."
                                },
                                {
                                    replied_by : "Bruce Wayne",
                                    content : "Definitely!"
                                }
                            ]
                        }
                    ]
                },
                {
                    title : "AI",
                    route : "ai",
                    description : "Subjects about AI..."
                },
                {
                    title : "Hardware",
                    route : "hardware",
                    description : "Latest graphic cards, RAMs etc."
                }
            ]
        },
        {
            title : "Work & Finance",
            route : "workfinance",
            sub_categories : [
                {
                    title : "General",
                    route : "general",
                    description : "Everything about finance."
                },
                {
                    title : "Home",
                    route : "home",
                    description : "Subjects about Home finance."
                },
                {
                    title : "Remote Work",
                    route : "remotework",
                    description : "Everything about finding remote work."
                }
            ]
        }
    ]
}

app.get('/', (req, res) => {
    res.render('index.ejs', {
        forumData
    });
});

app.get('/:category', (req, res) => {
    const category = req.params.category;

    for( var i = 0; i < forumData.categories.length; i++ ) {

        if( forumData.categories[i].route === category ) {
            return res.status(200).render('category.ejs', {
                category : forumData.categories[i],
                routes : {
                    categoryRoute : forumData.categories[i].route,
                }
            });
        }

        if( i === forumData.categories.length - 1 )
            return res.send('Category not found.');
    }

});

app.get('/:category/:sub_category', (req, res) => {
    const category = req.params.category;
    const sub_category = req.params.sub_category;

    for( var i = 0; i < forumData.categories.length; i++ ) {

        if( forumData.categories[i].route === category ) {
            for( var j = 0; j < forumData.categories[i].sub_categories.length; j++ ) {
                if( forumData.categories[i].sub_categories[j].route === sub_category )
                    return res.render('sub_category.ejs', {
                        category : forumData.categories[i],
                        routes : {
                            categoryRoute : forumData.categories[i].route,
                            sub_categoryRoute : forumData.categories[i].sub_categories[j].route
                        },
                        sub_category : forumData.categories[i].sub_categories[j],
                        posts : forumData.categories[i].sub_categories[j].posts
                    });

                if( j === forumData.categories[i].sub_categories.length - 1 )
                    return res.send('Sub category not found.');
            }
        }

        if( i === forumData.categories.length - 1 )
            return res.send('Category not found.');
    }
});

app.get('/:category/:sub_category/:post', (req, res) => {
    const category = req.params.category;
    const sub_category = req.params.sub_category;
    const post = req.params.post;

    for( var i = 0; i < forumData.categories.length; i++ ) {

        if( forumData.categories[i].route === category ) {
            for( var j = 0; j < forumData.categories[i].sub_categories.length; j++ ) {
                if( forumData.categories[i].sub_categories[j].route === sub_category ) {
                    for( var k = 0; k < forumData.categories[i].sub_categories[j].posts.length; k++ ) {
                        if( forumData.categories[i].sub_categories[j].posts[k].route === post )
                            return res.status(200).render('post.ejs', {
                                category : forumData.categories[i],
                                sub_category : forumData.categories[i].sub_categories[j],
                                routes : {
                                    categoryRoute : forumData.categories[i].route,
                                    sub_categoryRoue : forumData.categories[i].sub_categories[j].route,
                                    postRoute : forumData.categories[i].sub_categories[j].posts[k].route
                                },
                                post : forumData.categories[i].sub_categories[j].posts[k]
                            });

                        if( k === forumData.categories[i].sub_categories[j].posts.length - 1 )
                            return res.status(400).send('Posts not found.');
                    }
                }

                if( j === forumData.categories[i].sub_categories.length - 1 )
                    return res.send('Sub category not found.');
            }
        }

        if( i === forumData.categories.length - 1 )
            return res.send('Category not found.');
    }
});

app.get('/register', (req, res) => {
    res.send('Hello, Register Page.');
});

app.get('/login', (req, res) => {
    res.send('Hello, Login Page.');
});

app.get('/profile', (req, res) => {
    res.send('Hello, Profile Page.');
});

app.listen(PORT, () => { console.log(`Server runs at ${PORT}`) });