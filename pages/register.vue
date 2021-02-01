<template>
    <div>
        <section class="Form my-4 mx-5">
            <div class="container">
                <div class="row no-gutters">
                    <div class="col-lg-5">
                        <img src="https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" class="img-fluid">
                    </div>
                    <div class="col-lg-7 px-5 pt-5">
                        <h1 class="font-weight-bold py-3">Register</h1>
                        <h4>Sign up rigth now!</h4>
                        <form action="">
                            <div class="form-row">
                                <div class="col-lg-7">
                                    <input type="text" class="form-control my-3 p-4" placeholder="Enter your username">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-7">
                                    <input type="email" class="form-control my-3 p-4" placeholder="Enter your email">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-7">
                                    <input type="password" class="form-control my-3 p-4" placeholder="Enter your password">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-7">
                                    <button type="submit" class="btn1 mt-3 mb-5">Sign up</button>
                                </div>
                            </div>
                            <p>Do you have an account? <a href="/login">Login Now!</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>



<style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        background-color: rgb(219, 226, 226);
    }
    .row{
        background-color: white;
        border-radius: 3px;
        box-shadow: 12px 12px 22px grey;
    }
    img{
        border-top-left-radius: 10px;
        border-bottom-left-radius: 5px;
    }
    .btn1{
        border: none;
        outline: none;
        height: 50px;
        width: 100%;
        background-color: black;
        color: white;
        border-radius: 4px;
        font-weight:bold ;
    }
    .btn1:hover{
        background-color: white;
        border: 1px solid;
        color: black;
    }
</style>