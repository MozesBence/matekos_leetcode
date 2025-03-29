jest.mock("../api/database/dbContext", () => require("../__mocks__/dbContext"));

const request = require("supertest");

const app = require("../app");

describe(" <---- MathSolve tests ----> ", () =>{
    beforeAll(async () =>{
        const db = require("../__mocks__/dbContext");
                
        await db.sequelize.sync({ force: true });
    
        await db.Themes.initializeThemes();
            
        await db.Tasks.initializeTasks();
        
        await db.Community_tags.initializeTags();
        
        await db.Advertisement_Cards.initializeCards();
        
        await db.StoreItems.initializeStoreItems();
    
        await db.Daily_Tasks.initializeDaily();
    
        await db.DailyQuote.initializeDailyQuote();
        
        //await db.sequelize.sync({ force: true });
    })

    var token;
    describe(" | logregController test | ", () =>
        {
            describe(" --- Register user", () =>{
                var regUser;
                beforeAll(async () =>{
                    regUser = await request(app).post("/register").send({
                        email: "pinteadani88@gmail.com",
                        user_name: "_dennny",
                        password: "hashelt_jelszó"
                    });
                })

                test('should return with 201 status code', () => {
                    expect(regUser.status).toBe(201);
                })
                
                test('should return with the correct message', () => {
                    expect(regUser.res.text).toBe('A felhasználó regisztrálva lett és az email el lett küldve!');
                })
            })

            describe(" --- Wrong success register", () =>{
                var successRegister;
                beforeAll(async () =>{
                    successRegister = await request(app).post("/success-register").send({token: "semmi"});
                })

                test('should return with 404 status code', () => {
                    expect(successRegister.status).toBe(404);
                })
                
                test('should return with the correct error message', () => {
                    expect(successRegister.error.text).toBe("Nem megfelelő a token vagy már nem létezik!");
                })
            })

            describe(" --- Wrong login tests", () =>{
                var login1;
                beforeAll(async () =>{
                    login1 = await request(app).post("/login").send({
                        email: "pinteadani88@gmail.com",
                        password: "asdasdasd",
                        rememberMe: true
                    });
                })

                test('should return with 400 status code', () => {
                    expect(login1.status).toBe(400);
                })
                
                test('should return with the correct error message', () => {
                    expect(login1.res.text).toEqual("Nem sikerült a bejelentkezés!");
                })
            })

            describe(" --- Login user", () =>{
                beforeAll(async () =>{
                    token = await request(app).post("/login").send({
                        email: "pinteadani88@gmail.com",
                        password: "hashelt_jelszó",
                        rememberMe: true
                    });
                })

                test('should return with 200 status code', () => {
                    expect(token.status).toBe(200);
                })
                
                test('should return with token', () => {
                    expect(token).toBeDefined();
                    expect(typeof token.res.text).toBe('string');
                    const tokenParts = token.res.text.split('.');
                    expect(tokenParts.length).toBe(3);
                })
            })

            describe(" --- Forget password", () =>{
                var forgetPassword;
                beforeAll(async () =>{
                    forgetPassword = await request(app).post("/forget-password").send({
                        email: "pinteadani88@gmail.com",
                    });
                })

                test('should return with 200 status code', () => {
                    expect(forgetPassword.status).toBe(200);
                })
                
                test('should return with the correct message', () => {
                    expect(forgetPassword.res.text).toBe('Új jelszó kérelem el lett küldve a emailre!');
                })
            })

            describe(" --- Wrong forget password", () =>{
                var forgetPassword;
                beforeAll(async () =>{
                    forgetPassword = await request(app).post("/forget-password").send({
                        email: "pinteadani8@gmail.com",
                    });
                })

                test('should return with 404 status code', () => {
                    expect(forgetPassword.status).toBe(404);
                })
                
                test('should return with the correct error message', () => {
                    expect(forgetPassword.res.text).toBe('Ilyen felhasználó nem létezik!');
                })
            })

            describe(" --- Wrong set new password", () =>{
                var setPassword;
                beforeAll(async () =>{
                    setPassword = await request(app).patch("/set-new-password").send({token: null, password: "mindegy"});
                })

                test('should return with 400 status code', () => {
                    expect(setPassword.status).toBe(400);
                })
                
                test('should return with the correct error message', () => {
                    expect(setPassword.error.text).toBe("Rossz az elérési útvonal!");
                })
            })

        }
    )

    describe(" | advetisement_cards_controller test | ", () =>
        {
            describe(" --- Get Cards", () =>{
                var cards;
                beforeAll(async () =>{
                    cards = await request(app).get("/api/ads/get-ads-for-mainpage");
                })

                test('should return with 200 status code', () => {
                    expect(cards.status).toBe(200);
                })
                
                test('should return with an array which contains 5 card', () => {
                    expect(cards.body.length).toBe(5);
                })
            })
        }
    )

    describe(" | communityController test | ", () =>
        {
            describe(" --- Post upload", () =>{
                var post;
                beforeAll(async () =>{
                    post = await request(app)
                    .post("/community")
                    .set("Content-Type", "multipart/form-data")
                    .field("id", "1")
                    .field("title", "Test post")
                    .field("content", "<div>Test post content</div>")
                    .field("chips", JSON.stringify([1, 2]));
                })

                test('should return with 201 status code', () => {
                    expect(post.status).toBe(201);
                })
                
                test('should return with the correct values', () => {
                    expect(Object.keys(post.body).length).toBe(6);
                    expect(post.body.gotEdit).toEqual(false);
                })
            })

            describe(" --- Post edit", () =>{
                var post_edit;
                beforeAll(async () =>{
                    const formData = {
                        id: 1,
                        title: 'Updated Title',
                        content: '<div>Updated content</div>',
                        none_files: JSON.stringify([]),
                        new_Chips: JSON.stringify([3, 4]),
                        none_Chips: JSON.stringify([1, 2]),
                    };
                
                    post_edit = await request(app)
                    .patch("/community/post-edit")
                    .field("id", formData.id.toString())
                    .field("title", formData.title)
                    .field("content", formData.content)
                    .field("none_files", formData.none_files)
                    .field("new_Chips", formData.new_Chips)
                    .field("none_Chips", formData.none_Chips);
                })

                test('should return with 200 status code', () => {
                    expect(post_edit.status).toBe(200);
                })
                
                test('should return with the correct values', () => {
                    expect(Object.keys(post_edit.body).length).toBe(6);
                    expect(post_edit.body.gotEdit).toEqual(true);
                    expect(post_edit.body.title).toEqual('Updated Title');
                    expect(post_edit.body.content).toEqual('<div>Updated content</div>');
                })
            })

            describe(" --- Comment upload", () =>{
                var comment;
                beforeAll(async () =>{
                    comment = await request(app).post("/community/post-comment").send({content: 'Test content', linkAuthor: null, linked_id: 1, user_id: 1, type: 1 });
                })

                test('should return with 201 status code', () => {
                    expect(comment.status).toBe(201);
                })
                
                test('should return with the correct values', () => {
                    expect(Object.keys(comment.body).length).toBe(8);
                    expect(comment.body.gotEdit).toEqual(false);
                })
            })

            describe(" --- Comment edit", () =>{
                var comment_edit;
                beforeAll(async () =>{
                    comment_edit = await request(app).patch("/community/comment-edit").send({content: "Edit content", comment_id: 1});
                })

                test('should return with 200 status code', () => {
                    expect(comment_edit.status).toBe(200);
                })
                
                test('should return with the correct message', () => {
                    expect(comment_edit.res.text).toEqual("Sikeres volt a szerkeztés!");
                })
            })

            describe(" --- Post like", () =>{
                var post_like;
                beforeAll(async () =>{
                    post_like = await request(app).post("/community/post-like").send({post_id: 1, user_id: 1, upload_type: "post", type: 0});
                })

                test('should return with 201 status code', () => {
                    expect(post_like.status).toBe(201);
                })
                
                test('should return with the correct value', () => {
                    expect(post_like.body.like_type).toEqual('like');
                    expect(post_like.body.entity_type).toEqual('post');
                })
            })

            describe(" --- Get posts", () =>{
                var posts;
                beforeAll(async () => {
                    posts = await request(app)
                    .get("/community")
                    .query({
                        limit: 10,
                        offset: 0,
                        id: 1,
                        filter: null,
                        tagsArray: JSON.stringify([3]),
                        search: null
                    });
                });


                test('should return with 200 status code', () => {
                    expect(posts.status).toBe(200);
                })
                
                test('should return with an array which has 1 post', () => {
                    expect(posts.body.posts.length).toEqual(1);
                })
            })

            describe(" --- Get comments", () =>{
                var comments;
                beforeAll(async () => {
                    comments = await request(app)
                    .get("/community/get-comments")
                    .query({
                        limit: 10,
                        offset: 0,
                        id: 1,
                        type: 0,
                        userId: 1
                    });
                });


                test('should return with 200 status code', () => {
                    expect(comments.status).toBe(200);
                })
                
                test('should return with an array which has 1 comment', () => {
                    expect(comments.body.comments.length).toEqual(1);
                })
            })

            describe(" --- Get Tags", () =>{
                var tags;
                beforeAll(async () => {
                    tags = await request(app).get("/community/tags");
                });

                test('should return with 200 status code', () => {
                    expect(tags.status).toBe(200);
                })
                
                test('should return with an array which contains 5 tag', () => {
                    expect(tags.body.length).toEqual(5);
                })
            })

            describe(" --- Send report", () =>{
                var report;
                beforeAll(async () => {
                    report = await request(app).post("/community/reports").send({type: 1, notif_content: "Sent report", content_type: null, user_id: 1, from_user_id: 1, content_id: null});
                });

                test('should return with 200 status code', () => {
                    expect(report.status).toBe(200);
                })
                
                test('should return with the correct message', () => {
                    expect(report.res.text).toEqual("El lett küldve a bejelentés!");
                })
            })
        }
    )

    describe(" | contestController test | ", () =>
        {
            describe(" --- Get leaderboard", () =>{
                var leaderboard;
                beforeAll(async () =>{
                    leaderboard = await request(app).get("/contest/leader-board");
                })

                test('should return with 200 status code', () => {
                    expect(leaderboard.status).toBe(200);
                })
                
                test('should return with an array which contains 1 user', () => {
                    expect(leaderboard.body.length).toBe(1);
                    expect(leaderboard.body).toBeInstanceOf(Array);
                    expect(leaderboard.body.length).toBeGreaterThan(0);
                    expect(leaderboard.body[0]).toHaveProperty('name');
                })
            })
        }
    )

    describe(" | profileController test | ", () =>
        {
            describe(" --- Get user", () =>{
                var user;
                beforeAll(async () =>{
                    user = await request(app).get("/profile").set({"token": `${token.res.text}`}).set({"id": `1`})
                })

                test('should return with 200 status code', () => {
                    expect(user.status).toBe(200);
                })
                
                test('should return with an array which contains 1 user', () => {
                    expect(Object.keys(user.body).length).toBe(15);
                    expect(user.body).toBeInstanceOf(Object);
                    expect(user.body).toHaveProperty('user_name');
                })
            })

            describe(" --- Get rank", () =>{
                var rank;
                beforeAll(async () =>{
                    rank = await request(app).get("/profile-rank/1")
                })

                test('should return with 200 status code', () => {
                    expect(rank.status).toBe(200);
                })
                
                test('should return with number 1', () => {
                    expect(rank.body).toBe(1);
                })
            })
        }
    )

    describe(" | themeController test | ", () =>
        {
            describe(" --- Get themes", () =>{
                var theme;
                beforeAll(async () =>{
                    theme = await request(app).get("/themes");
                })

                test('should return with 200 status code', () => {
                    expect(theme.status).toBe(200);
                })
                
                test('should return with an array which contains 22 theme', () => {
                    expect(Object.keys(theme.body).length).toBe(22);
                })
            })

            describe(" --- Get theme's name", () =>{
                var theme;
                beforeAll(async () =>{
                    theme = await request(app).get("/getThemeById/1");
                })

                test('should return with 200 status code', () => {
                    expect(theme.status).toBe(200);
                })
                
                test('should return with the correct theme', () => {
                    expect(theme.body.theme).toBe("Abszolútérték, gyök");
                })
            })
        }
    )

    describe(" | settingsConfirmController test | ", () =>
        {
            const settingsConfirmRepository = require("../api/repositories/settingsConfirmRepository")
            describe(" --- Send code", () =>{
                var code;
                beforeAll(async () =>{
                    code = await request(app).get("/get-confirm-code").query({
                        id: 1, 
                        email: "pinteadani88@gmail.com", 
                        user_name : "_dennny"
                    });
                })

                test('should return with 201 status code', () => {
                    expect(code.status).toBe(201);
                })
                
                test('should return with the correct message', () => {
                    expect(code.body.message).toEqual('Kód sikeresen elküldve');
                })
            })

            describe(" --- Wrong send code", () =>{
                var code1;
                var code2;
                beforeAll(async () =>{
                    code1 = await request(app).get("/get-confirm-code").query({
                        id: 1, 
                        email: null, 
                        user_name : "_dennny"
                    });
                    code2 = await request(app).get("/get-confirm-code").query({
                        id: 1, 
                        email: "pinteadani88@gmail.com", 
                        user_name : null
                    });
                })

                test('should return with 400 status code', () => {
                    expect(code1.status).toBe(400);
                })
                
                test('should return with the correct error message', () => {
                    expect(code1.error.text).toEqual('Nincs megadva email cím!');
                })

                test('should return with 400 status code', () => {
                    expect(code2.status).toBe(400);
                })
                
                test('should return with the correct error message', () => {
                    expect(code2.error.text).toEqual('Nem található a felhasználó neve!');
                })
            })

            describe(" --- Get all reports", () =>{
                var reports;
                beforeAll(async () =>{
                    reports = await request(app).get("/get-all-reports").set({"token": `${token.res.text}`});
                })

                test('should return with 200 status code', () => {
                    expect(reports.status).toBe(200);
                })
                
                test('should return with an array which contains 1 report', () => {
                    expect(reports.body.length).toEqual(1);
                })
            })

            describe(" --- Wrong get all reports", () =>{
                var reports;
                beforeAll(async () =>{
                    reports = await request(app).get("/get-all-reports").set({"token": "semmi"});
                })

                test('should return with 400 status code', () => {
                    expect(reports.status).toBe(400);
                })
                
                test('should return with the correct error message', () => {
                    expect(reports.error.text).toEqual("Invalid token");
                })
            })

            describe(" --- Get all reports", () =>{
                var reports;
                beforeAll(async () => {
                        reports = await settingsConfirmRepository.getReports();
                    }
                )

                test('should return with a false value', () => {
                    expect(reports).toBeInstanceOf(Array);
                })
            })

            describe(" --- Close reports", () =>{
                var closed_reports;
                var reports;
                beforeAll(async () =>{
                    closed_reports = await request(app).post("/close-report").send({
                        id: 1, 
                        user_id: 1, 
                        admin_id: 1, 
                        content: "Üzenet lezárva", 
                        content_id: null, 
                        content_type: null, 
                        token: token.res.text
                    }).set({"token": `${token.res.text}`});
                })

                test('should return with 201 status code', () => {
                    expect(closed_reports.status).toBe(201);
                })
                
                test('should return with the correct message', () => {
                    expect(closed_reports.res.text).toEqual('El lett küldve az értesítés!');
                })
            })

            describe(" --- Set user settings", () =>{
                var user;
                beforeAll(async () => {
                    user = await request(app).patch("/set-user-settings")
                        .send({
                            content: "_dennny_changed",
                            id: 1,
                            type: 1,
                            token: token.res.text
                        })
                        .set({"token": `${token.res.text}`});
                    }
                )

                test('should return with 200 status code', () => {
                    expect(user.status).toBe(200);
                })
                
                test('should return with the correct value', () => {
                    expect(user.res.text.length).toEqual(("_dennny_changed").length);
                    expect(user.res.text).toEqual("_dennny_changed");
                })
            })

            describe(" --- Set user role", () =>{
                var user;
                beforeAll(async () => {
                    user = await request(app).patch("/set-user-roles")
                        .send({
                            id: 1,
                            type: 3,
                            token: token.res.text
                        })
                        .set({"token": `${token.res.text}`});
                    }
                )

                test('should return with 200 status code', () => {
                    expect(user.status).toBe(200);
                })
                
                test('should return with the correct message', () => {
                    expect(user.res.text).toEqual("A felhasználónak a jogosultsága megváltozott!");
                })
            })

            describe(" --- Get all notifications", () =>{
                var notifs;
                beforeAll(async () => {
                        notifs = await request(app).get("/get-all-notifs")
                        .query({
                            id: 1
                        })
                    },
                )

                test('should return with 200 status code', () => {
                    expect(notifs.status).toBe(200);
                })
                
                test("should return with an array which contains 1 notification and it's id is 2", () => {
                    expect(notifs.body.length).toEqual(1);
                    expect(notifs.body[0].id).toEqual(2);
                })
            })

            describe(" --- Get else user by id", () =>{
                var user;
                beforeAll(async () => {
                        user = await settingsConfirmRepository.getElseUserById(1);
                    }
                )

                test('should return with a false value', () => {
                    expect(user).not.toBeTruthy();
                })
            })
        }
    )

    describe(" | storeItemsController test | ", () =>
        {
            describe(" --- Get store items", () =>{
                var items;
                beforeAll(async () =>{
                    items = await request(app).get("/api/store/getItems");
                })

                test('should return with 200 status code', () => {
                    expect(items.status).toBe(200);
                })
                
                test('should return with an array which contains 4 item', () => {
                    expect(Object.keys(items.body).length).toBe(4);
                })
            })
        }
    )

    describe(" | tasksController test | ", () =>
        {
            describe(" --- Get a card", () =>{
                var card;
                beforeAll(async () =>{
                    card = await request(app).get("/api/tasks/get-one-card/1");
                })

                test('should return with 200 status code', () => {
                    expect(card.status).toBe(200);
                })
                
                test('should return an object with exactly 11 properties', () => {
                    expect(Object.keys(card.body).length).toBe(11);
                })
            })

            describe(" --- Get random task", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/tasks/random-task");
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return an object', () => {
                    expect(task.body).toBeInstanceOf(Object);
                })
            })

            describe(" --- Get filtered tasks", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/tasks/filteredTasks").query("gyök");
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return an array which has some objects in it', () => {
                    expect(task.body.length).toBeGreaterThan(0);
                    expect(task.body[0]).toBeInstanceOf(Object);
                })
            })

            describe(" --- Get similar tasks", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/tasks/getsimilarTasks?taskId=2&themeId=1");
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return an array which has objects in it', () => {
                    expect(task.body.length).toBeGreaterThan(0);
                    expect(task.body[0]).toBeInstanceOf(Object);
                })
            })

            describe(" --- Get tasks solution", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/tasks/solution/2");
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return an object which has atleast one value', () => {
                    expect(task.body.solution.split(' ').length).toBeGreaterThan(0);
                    expect(task.body).toBeInstanceOf(Object);
                })
            })

            describe(" --- Get unvalidated task", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/tasks/unvalidatedTasks");
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return an object which has one task', () => {
                    expect(task.body.length).toBe(1);
                })
            })
        }
    )

    describe(" | tasks_solutionsController test | ", () =>
        {
            describe(" --- Get a card state", () =>{
                var card;
                beforeAll(async () =>{
                    card = await request(app).get("/api/task_solution/taskState/1");
                })

                test('should return with 200 status code', () => {
                    expect(card.status).toBe(200);
                })
                
                test('should return with and empty array', () => {
                    expect(card.body.length).toBe(0);
                })
            })

            describe(" --- Get completion rates", () =>{
                var card;
                beforeAll(async () =>{
                    card = await request(app).get("/api/task_solution/tasks/task-completion-rates");
                })

                test('should return with 200 status code', () => {
                    expect(card.status).toBe(200);
                })
                
                test('should return with and empty array', () => {
                    expect(card.body.length).toBe(0);
                })
            })

            describe(" --- Get solved tasks rate", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/task_solution/solved-tasks-rate/1");
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return with userId to be 1', () => {
                    expect(task.body.userId).toBe('1');
                })  
            })

            describe(" --- Get task by completion state", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/task_solution/task-by-completion-state/1/1");
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return with the undefined value', () => {
                    expect(task.body.userId).toBe(undefined);
                })  
            })

            describe(" --- Get monthly solving rate", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/task_solution/monthlySolvingRate").query({userId:1});
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return with an array which is 12 long', () => {
                    expect(task.body.length).toBe(12);
                })  
            })

            describe(" --- Get most recently tried task", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/task_solution/mostRecentlyTriedTask").query({userId:1});
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return with the null value', () => {
                    expect(task.body).toBe(null);
                })  
            })

            describe(" --- Get daily task streak", () =>{
                var task;
                beforeAll(async () =>{
                    task = await request(app).get("/api/task_solution/dailyTaskStreak").query({userId:1});
                })

                test('should return with 200 status code', () => {
                    expect(task.status).toBe(200);
                })
                
                test('should return with the null value', () => {
                    expect(task.body.longestStreak).toBe(0);
                })  
            })
        }
    )

    describe(" | daily_taskController test | ", () =>
        {
            describe(" --- Get daily task", () =>{
                var daily;
                beforeAll(async () =>{
                    daily = await request(app).get("/api/daily_tasks/get-daily-task/25");
                })

                test('should return with 200 status code', () => {
                    expect(daily.status).toBe(200);
                })
                
                test('should return with an object which has a task_id', () => {
                    expect(daily.body.task_id).toEqual(2);
                })
            })

            describe(" --- Get wrong daily task", () =>{
                var daily;
                beforeAll(async () =>{
                    daily = await request(app).get("/api/daily_tasks/get-daily-task/55");
                })

                test('should return with 200 status code', () => {
                    expect(daily.status).toBe(200);
                })
                
                test('should return with the correct error message', () => {
                    expect(daily.error.text).toEqual(undefined);
                })
            })

            describe(" --- Check daily task", () =>{
                var daily;
                beforeAll(async () =>{
                    daily = await request(app).get("/api/daily_tasks/checkIfDailyTask/2");
                })

                test('should return with 200 status code', () => {
                    expect(daily.status).toBe(200);
                })
                
                test('should return with an object', () => {
                    expect(daily.body).toBeInstanceOf(Object);
                })
            })

            describe(" --- Check wrong daily task", () =>{
                var daily;
                beforeAll(async () =>{
                    daily = await request(app).get("/api/daily_tasks/checkIfDailyTask/40");
                })

                test('should return with 200 status code', () => {
                    expect(daily.status).toBe(200);
                })
                
                test('should return with a null value', () => {
                    expect(daily.body).toEqual(null);
                })
            })
        }
    )
})