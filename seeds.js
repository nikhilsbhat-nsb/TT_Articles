var mongoose = require('mongoose');
var TT=require('./models/tt');
var Comment=require('./models/comment');

var data=[
    {
        name:"Racket",
        image: "https://www.vinex.in/Uploaded_Images/mm_bigger/VINEX%20T.T.%20BAT%20-%20COLLIDER-5%20STAR_771333.jpg",
        description:"A basic table tennis paddle (also known as a Racket or bat) is used by table tennis players. The table tennis paddle is usually made from laminated wood covered with rubber on one or two sides depending on the player's grip. Unlike a conventional paddle, it does not include strings strung across an open frame. The USA generally uses the term paddle while Europeans and Asians use the term bat and the official ITTF term is racket."
    },
    {
        name:"Table",
        image: "https://4.imimg.com/data4/KO/OK/MY-7397124/table-tennis-table-500x500.jpg",
        description:"The table is 2.74 m (9.0 ft) long, 1.525 m (5.0 ft) wide, and 76 cm (2.5 ft) high with any continuous material so long as the table yields a uniform bounce of about 23 cm (9.1 in) when a standard ball is dropped onto it from a height of 30 cm (11.8 in), or about 77%.[25][26] The table or playing surface is uniformly dark coloured and matte, divided into two halves by a net at 15.25 cm (6.0 in) in height. The ITTF approves only wooden tables or their derivates. Concrete tables with a steel net or a solid concrete partition are sometimes available in outside public spaces, such as parks."
    },
    {
        name:"Ball",
        image: "https://5.imimg.com/data5/DA/EM/MY-3564299/stag-table-tennis-ball-500x500.jpg",
        description:"The international rules specify that the game is played with a sphere having a mass of 2.7 grams (0.095 oz) and a diameter of 40 millimetres (1.57 in).[23] The rules say that the ball shall bounce up 24–26 cm (9.4–10.2 in) when dropped from a height of 30.5 cm (12.0 in) onto a standard steel block thereby having a coefficient of restitution of 0.89 to 0.92. Balls are now made of a polymer instead of celluloid as of 2015, colored white or orange, with a matte finish. The choice of ball color is made according to the table color and its surroundings. For example, a white ball is easier to see on a green or blue table than it is on a grey table. Manufacturers often indicate the quality of the ball with a star rating system, usually from one to three, three being the highest grade. As this system is not standard across manufacturers, the only way a ball may be used in official competition is upon ITTF approval[23] (the ITTF approval can be seen printed on the ball).The 40 mm ball was introduced after the end of the 2000 Summer Olympics; previously a 38 mm ball was standard.[19] This created some controversies. Then World No 1 table tennis professional Vladimir Samsonov threatened to pull out of the World Cup, which was scheduled to debut the new regulation ball on October 12, 2000."
    }
];

function seedDB(){
    TT.remove({}, function (err){
        if(err){
            console.log(err);
        }
        console.log("Removed TT equipments");
        data.forEach(function(seed){
            TT.create(seed, function(err, tt){
                if(err){
                    console.log(err);
                }else{
                    console.log("TT equipment added");
                    Comment.create(
                        {
                            text:"I wish it is made up of carbon",
                            author:"Rahul"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                tt.comments.push(comment);
                                tt.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
         });
     });
}

module.exports = seedDB;
