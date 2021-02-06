<template>
    <div>
        <footer class="footer">
            <div class="footer-left">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic est, explicabo non impedit delectus iure cum fugiat earum omnis porro vitae esse repellendus dolorem? Illo ut impedit assumenda distinctio laborum.</p>
                <div class="socials">
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-instagram"></i></a>
                    <a href=""><i class="fa fa-youtube"></i></a>
                </div>
            </div>
            <ul class="footer-right">
                <li>
                    <h2>Product</h2>
                    <ul class="box">
                        <li><a href="#">Theme Design</a></li>
                        <li><a href="#">Plugin Design</a></li>
                        <li><a href="#">Theme Design</a></li>
                    </ul>
                </li>
                <li class="feauters">
                    <h2>Useful links</h2>
                    <ul class="box">
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Sales</a></li>
                    </ul>
                </li>
                <li>
                    <h2>Adress</h2>
                    <ul class="box">
                        <li><a href="#">Luis R Garcia 825</a></li>
                        <li><a href="#">Villa Santa Rosa de Rio Primero</a></li>
                        <li><a href="#">Cordoba</a></li>
                        <li><a href="#">Argentina</a></li>
                    </ul>
                </li>
            </ul>
            <div class="footer-bottom">
                <p>All right reverved by copyright</p>
            </div>
        </footer>
    </div>
</template>



<style>
    *,*::before,*:after{
        box-sizing: border-box;
    }
    body{
        margin: 0;
        display: grid;
        font-size: 14px;
    }
    main{
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9b9b9b;
        line-height: 3.8;
        font-size: 80px;
        text-transform: uppercase;
        font-weight: bold;
    }

    footer{
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex; ;
        flex-flow: row wrap;
        padding: 50px;
        color: #fff;
        background-color: #011c39;
    }

    .footer > *{
        flex: 1 100%;
    }

    .footer-left{
        margin-right: 1.25em;
        margin-bottom: 2em;
    }
    .footer-left img{
        width: 50%;
    }
    h2{
        font-weight: 600;
        font-size: 17px;
    }
    .footer ul{
        list-style: none;
        padding-left: 0;
    }

    .footer a {
        text-decoration: none;
    }

    .footer-right{
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        flex-flow: row wrap;
    }
    .footer-right > *{
        flex: 1 50%;
        margin-right: 1.25em;
    }

    .box a{
        color: #999;
    }

    .footer-bottom{
        text-align: center;
        color: #999;
        padding-top: 50px;
    }

    .footer-left p{
        padding-right: 20%;
        color: #999;
    }

    .socials a{
        background: #364a62;
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-right: 10px;
    }

    .socials a i{
        color: #e7f2f4;
        padding: 10px 12px;
        font-size: 20px;
    }
@media screen and (min-width: 600px) {
    .footer-right > *{
        flex:1
    }
    .footer-left{
        flex: 1 0px
    }
    .footer-right{
        flex: 2 0px
    }
}

@media (max-width: 600px) {
    .footer{
        padding: 15px
    }
    main{
        font-size: 55px
    }
}

</style>