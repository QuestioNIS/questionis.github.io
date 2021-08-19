function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.querySelector('html').scrollTop = window.scrollY;
}

function enableScroll() {
    document.body.style.overflow = null;
}

function scrollToTop() {
    window.scrollTo(0,0);
}

let app = Vue.createApp({
    data: () => ({
        page: "home",
        sortedQna: null,
        qna: [
            {
                questionid: "01",
                author: "Person 1",
                date: "21/07/2021",
                age: "1d",
                title: "Question 1",
                content: "What is the answer for this question?",
                img: "null",
                tags: [],
                solved: "Solved",
                comments: "15",
                upvotes: "-11",
                upvote: "",
            },
            {
                questionid: "02",
                author: "GuyWith ALongName",
                date: "02/08/2021",
                age: "2mo",
                title: "What is the answer for this question?",
                content: "What is the answer for this question?",
                img: "images/profilePics/sf.png",
                tags: ["Physics", "Chemistry"],
                solved: "Solved",
                comments: "15",
                upvotes: "20",
                upvote: "upvoted",
            },
            {
                questionid: "03",
                author: "Person 2",
                date: "02/08/2021",
                age: "10y",
                title: "What is the answer for this question? What is the answer for this question?",
                content: "What is the answer for this question?",
                img: "images/profilePics/tm.png",
                tags: ["GPPW", "Biology", "Geography", "Physics", "Chemistry"],
                solved: "Unsolved",
                comments: "15",
                upvotes: "150",
                upvote: "downvoted",
            },
        ],
        loggedin: false,
        sidebar: false,
        signinForm: false,
        signupForm: false,
        loginErrorMessage: false,
        registerErrorMessage: false,
        parentErrorMessage: false,
        passwordErrorMessage: false,
        passwordsErrorMessage: false,
        loginMessage: false,
        user: {
            iin: null,
            fname: null,
            lname: null,
            sex: null,
            status: null,
            additional: null,
            childiin: null,
            pic: null,
            darkTheme: false,
        }
    }),
    created: function() {
        if(window.localStorage.getItem("loggedin") !== null) {
            window.sessionStorage.setItem("loggedin", window.localStorage.getItem("loggedin"))
            window.sessionStorage.setItem("iin", window.localStorage.getItem("iin"))
            window.sessionStorage.setItem("fname", window.localStorage.getItem("fname"))
            window.sessionStorage.setItem("lname", window.localStorage.getItem("lname"))
            window.sessionStorage.setItem("sex", window.localStorage.getItem("sex"))
            window.sessionStorage.setItem("status", window.localStorage.getItem("status"))
            window.sessionStorage.setItem("additional", window.localStorage.getItem("additional"))
            window.sessionStorage.setItem("childiin", window.localStorage.getItem("childiin"))
            window.sessionStorage.setItem("pic", window.localStorage.getItem("pic"))
            window.sessionStorage.setItem("darkTheme", window.localStorage.getItem("darkTheme"))
        }
        else if(window.sessionStorage.getItem("loggedin") === null) {
            window.sessionStorage.setItem("loggedin", "false")
            window.sessionStorage.setItem("iin", "null")
            window.sessionStorage.setItem("fname", "null")
            window.sessionStorage.setItem("lname", "null")
            window.sessionStorage.setItem("sex", "null")
            window.sessionStorage.setItem("status", "null")
            window.sessionStorage.setItem("additional", "null")
            window.sessionStorage.setItem("childiin", "null")
            window.sessionStorage.setItem("pic", "images/profilePics/null.png")
            window.sessionStorage.setItem("darkTheme", "false")
        }

        this.loggedin = window.sessionStorage.getItem("loggedin") ==="true"
        this.user.iin = window.sessionStorage.getItem("iin")
        this.user.fname = window.sessionStorage.getItem("fname")
        this.user.lname = window.sessionStorage.getItem("lname")
        this.user.sex = window.sessionStorage.getItem("sex")
        this.user.status = window.sessionStorage.getItem("status")
        this.user.additional = window.sessionStorage.getItem("additional")
        this.user.childiin = (window.sessionStorage.getItem("childiin") === "null") ? null:window.sessionStorage.getItem("childiin")
        this.user.pic = window.sessionStorage.getItem("pic")
        this.user.darkTheme = window.sessionStorage.getItem("darkTheme") === "true"

        this.page = (window.sessionStorage.getItem("page") !== null) ? window.sessionStorage.getItem("page"):"home"

        /* qna-ды датабейздан алып кою керек 
        this.qna =  */

        this.sortedQna = this.qna
    },
    methods: {
        pageChange(page) {
            window.sessionStorage.setItem("page", page)
            this.page = window.sessionStorage.getItem("page")
        },
        statusChange() {
            if(this.$el.querySelector(".form__status").value=="Student") {
                this.$el.querySelector(".form__class").style.display = "block";
                this.$el.querySelector(".form__subject").style.display = "none";
                this.$el.querySelector(".form__childIIN").style.display = "none";
            }
            else if(this.$el.querySelector(".form__status").value=="Teacher") {
                this.$el.querySelector(".form__class").style.display = "none";
                this.$el.querySelector(".form__subject").style.display = "block";
                this.$el.querySelector(".form__childIIN").style.display = "none";
            }
            else {
                this.$el.querySelector(".form__class").style.display = "none";
                this.$el.querySelector(".form__subject").style.display = "none";
                this.$el.querySelector(".form__childIIN").style.display = "block";
            }
        },
        scroll() {
            scrollToTop()
        },
        theme() {
            window.sessionStorage.setItem("darkTheme", (window.sessionStorage.getItem("darkTheme") === "true") ? "false":"true")
            if(window.localStorage.getItem("loggedin") !== null) {
                window.localStorage.setItem("darkTheme", (window.localStorage.getItem("darkTheme") === "true") ? "false":"true")
            }
            this.user.darkTheme = window.sessionStorage.getItem("darkTheme") === "true"
            /* датабейздага darkTheme = !darkTheme дисн */
        },
        clearSignin() {
            this.$el.querySelector(".signin-form__iin").value = "";
            this.$el.querySelector(".signin-form__password").value = "";
            this.$el.querySelector(".signin-form__remember").checked = false;
        },
        clearSignup() {
            this.$el.querySelector(".form__iin").value = ""
            this.$el.querySelector(".form__fname").value = ""
            this.$el.querySelector(".form__lname").value = ""
            this.$el.querySelector(".form__sex").value = "Male"
            this.$el.querySelector(".form__status").value = "Student"
            this.statusChange()
            this.$el.querySelector(".form__class").value = "7A"
            this.$el.querySelector(".form__subject").value = "Art"
            this.$el.querySelector(".form__childIIN").value = ""
            this.$el.querySelector(".form__password").value = ""
            this.$el.querySelector(".form__password2").value = ""
            this.$el.querySelector(".form__remember").checked = false
        },
        signin() {
            var signinIIN = (this.$el.querySelector(".signin-form__iin").value).replace(/^\s+|\s+$/gm,'')
            var signinPassword = this.$el.querySelector(".signin-form__password").value
            var signinRemember = this.$el.querySelector(".signin-form__remember").checked
            if(signinIIN==="" || signinPassword==="" /* || датабейзда бундай иин жок || пароль дурыс емес */) { 
                this.loginErrorMessage = true
                setTimeout(() => { this.loginErrorMessage = false; }, 3000);
            }
            else {
                /* ИИН бойынша букіл данныйды алу 
                var fname = 
                var lname = 
                var sex = 
                var status = 
                if(датабейздагы статус=="Parent") {
                    var additional = "Parent"
                    var childiin = датабейздагы additional
                }
                else {
                    var additional = 
                    var childiin = "null"
                }
                var pic = 
                var darkTheme =  */

                window.localStorage.clear()
                window.sessionStorage.clear()

                this.loggedin = true
                this.user.iin = signinIIN
                this.user.fname = fname
                this.user.lname = lname
                this.user.sex = sex
                this.user.status = status
                this.user.additional = additional
                this.user.childiin = childiin
                this.user.pic = pic
                this.user.darkTheme = darkTheme

                window.sessionStorage.setItem("loggedin", "true")
                window.sessionStorage.setItem("iin", signinIIN)
                window.sessionStorage.setItem("fname", fname)
                window.sessionStorage.setItem("lname", lname)
                window.sessionStorage.setItem("sex", sex)
                window.sessionStorage.setItem("status", status)
                window.sessionStorage.setItem("additional", additional)
                window.sessionStorage.setItem("childiin", childiin)
                window.sessionStorage.setItem("pic", pic)
                window.sessionStorage.setItem("darkTheme", darkTheme)

                if(signinRemember==true) {
                    window.localStorage.setItem("loggedin", "true")
                    window.localStorage.setItem("iin", signinIIN)
                    window.localStorage.setItem("fname", fname)
                    window.localStorage.setItem("lname", lname)
                    window.localStorage.setItem("sex", sex)
                    window.localStorage.setItem("status", status)
                    window.localStorage.setItem("additional", additional)
                    window.localStorage.setItem("childiin", childiin)
                    window.localStorage.setItem("pic", pic)
                    window.localStorage.setItem("darkTheme", darkTheme)
                }

                this.signinForm = false
                this.clearSignin()
                this.loginMessage = true
                setTimeout(() => { this.loginMessage = false; }, 3000);
                enableScroll()
            }
        },
        signup() {
            var signupIIN = (this.$el.querySelector(".form__iin").value).replace(/^\s+|\s+$/gm,'')
            var signupFname = (this.$el.querySelector(".form__fname").value).replace(/^\s+|\s+$/gm,'')
            var signupLname = (this.$el.querySelector(".form__lname").value).replace(/^\s+|\s+$/gm,'')
            var signupSex = this.$el.querySelector(".form__sex").value
            var signupStatus = this.$el.querySelector(".form__status").value
            if(signupStatus=="Student") {
                var signupAdditional = this.$el.querySelector(".form__class").value
            }
            else if(signupStatus=="Teacher") {
                var signupAdditional = this.$el.querySelector(".form__subject").value
            }
            else {
                var signupAdditional = (this.$el.querySelector(".form__childIIN").value).replace(/^\s+|\s+$/gm,'')
            }
            var signupPassword = this.$el.querySelector(".form__password").value
            var signupPassword2 = this.$el.querySelector(".form__password2").value
            var signupRemember = this.$el.querySelector(".form__remember").checked
            if(signupIIN==="" || signupFname==="" || signupLname==="" || signupAdditional==="" || signupPassword==="" || signupPassword2==="") {
                this.loginErrorMessage = true
                setTimeout(() => { this.loginErrorMessage = false; }, 3000);
            }
            /* else if(уже бундай ИИНмен акк ашылып койган) {
                this.registerErrorMessage = true
                setTimeout(() => { this.registerErrorMessage = false; }, 3000);
            } */
            /* else if(Parent болганда баласынын ИИНы датабейзда жок болса) {
                this.parentErrorMessage = true
                setTimeout(() => { this.parentErrorMessage = false; }, 3000);
            } */
            else if(signupPassword.length < 8) {
                this.passwordErrorMessage = true
                setTimeout(() => { this.passwordErrorMessage = false; }, 3000);
            }
            else if(signupPassword !== signupPassword2) {
                this.passwordsErrorMessage = true
                setTimeout(() => { this.passwordsErrorMessage = false; }, 3000);
            }
            else {
                var signupPic = "images/profilePics/" + (signupStatus.charAt(0) + signupSex.charAt(0)).toLowerCase() + ".png"
                window.localStorage.clear()
                window.sessionStorage.clear()

                this.loggedin = true
                this.user.iin = signupIIN
                this.user.fname = signupFname
                this.user.lname = signupLname
                this.user.sex = signupSex
                this.user.status = signupStatus
                if(signupStatus=="Parent") {
                    this.user.additional = "Parent"
                    this.user.childiin = signupAdditional
                }
                else {
                    this.user.additional = signupAdditional
                    this.user.childiin = null
                }
                this.user.pic = signupPic
                this.user.darkTheme = false

                window.sessionStorage.setItem("loggedin", "true")
                window.sessionStorage.setItem("iin", signupIIN)
                window.sessionStorage.setItem("fname", signupFname)
                window.sessionStorage.setItem("lname", signupLname)
                window.sessionStorage.setItem("sex", signupSex)
                window.sessionStorage.setItem("status", signupStatus)
                if(signupStatus=="Parent") {
                    window.sessionStorage.setItem("additional", "Parent")
                    window.sessionStorage.setItem("childiin", signupAdditional)
                }
                else {
                    window.sessionStorage.setItem("additional", signupAdditional)
                    window.sessionStorage.setItem("childiin", "null")
                }
                window.sessionStorage.setItem("pic", signupPic)
                window.sessionStorage.setItem("darkTheme", "false")

                if(signupRemember==true) {
                    window.localStorage.setItem("loggedin", "true")
                    window.localStorage.setItem("iin", signupIIN)
                    window.localStorage.setItem("fname", signupFname)
                    window.localStorage.setItem("lname", signupLname)
                    window.localStorage.setItem("sex", signupSex)
                    window.localStorage.setItem("status", signupStatus)
                    if(signupStatus=="Parent") {
                        window.localStorage.setItem("additional", "Parent")
                        window.localStorage.setItem("childiin", signupAdditional)
                    }
                    else {
                        window.localStorage.setItem("additional", signupAdditional)
                        window.localStorage.setItem("childiin", "null")
                    }
                    window.localStorage.setItem("pic", signupPic)
                    window.localStorage.setItem("darkTheme", "false")
                }

                this.signinForm = false
                this.signupForm = false
                this.clearSignup()
                this.loginMessage = true
                setTimeout(() => { this.loginMessage = false; }, 3000);
                enableScroll()
                /* датабейзга signupIIN, signupFname, signupLname, signupSex, signupStatus, signupAdditional, signupPic сактау, darkTheme = false деу */
            }
        },
        upvote(id) {
            /* if(датабейзда осындай айдиы бар суракты апвоут еткендердін арасында автордын иины бар) {
                датабейздагы апвоут еткен адамдардын арасынан автордын иинын алып тастау
            }
            else {
                if(датабейзда осындай айдиы бар суракты даунвоут еткендердін арасында автордын иины бар) {
                    датабейздагы даунвоут еткен адамдардын арасынан автордын иинын алып тастау
                }
                датабейздагы апвоут еткен адамдардын арасына автордын иинын косу
            } */
            for (question of this.qna) {
                if(question.questionid===id) {
                    if(question.upvote==="upvoted") {
                        question.upvote = "null"
                        question.upvotes = (Number(question.upvotes) - 1).toString()
                    }
                    else if(question.upvote==="downvoted") {
                        question.upvote = "upvoted"
                        question.upvotes = (Number(question.upvotes) + 2).toString()
                    }
                    else {
                        question.upvote = "upvoted"
                        question.upvotes = (Number(question.upvotes) + 1).toString()
                    }
                }
            }
            this.sortedQna = this.qna
        },
        downvote(id) {
            /* if(датабейзда осындай айдиы бар суракты даунвоут еткендердін арасында автордын иины бар) {
                датабейздагы даунвоут еткен адамдардын арасынан автордын иинын алып тастау
            }
            else {
                if(датабейзда осындай айдиы бар суракты апвоут еткендердін арасында автордын иины бар) {
                    датабейздагы апвоут еткен адамдардын арасынан автордын иинын алып тастау
                }
                датабейздагы даунвоут еткен адамдардын арасына автордын иинын косу
            } */
            for (question of this.qna) {
                if(question.questionid===id) {
                    if(question.upvote==="downvoted") {
                        question.upvote = "null"
                        question.upvotes = (Number(question.upvotes) + 1).toString()
                    }
                    else if(question.upvote==="upvoted") {
                        question.upvote = "downvoted"
                        question.upvotes = (Number(question.upvotes) - 2).toString()
                    }
                    else {
                        question.upvote = "downvoted"
                        question.upvotes = (Number(question.upvotes) - 1).toString()
                    }
                }
            }
            this.sortedQna = this.qna
        },
    }
}).mount('#app');