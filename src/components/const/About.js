import React from 'react';

const About = () => 
    <div className="about-container">
        <h2><img src="chili-logo.png" alt="logo"/>Create Your Own Hot Sauce<img src="chili-logo.png" alt="logo"/></h2>
        <br />
            <p>
                The purpose of this website is to allow customers to create personalized hot sauces in small batches.
                <br />
                From gifts, to parties, to restaruant tables, this is a great way for people to express their own taste.
            </p>
        <div className="about-points">
            <h3>Current Function:</h3>
                <ul>
                    <li>Create a hot sauce recipe and name it</li>
                    <li>Create user accounts to save and view recipes</li>
                    <li>Update or Delete your recipes</li>
                    <li>Provide default recipe labels</li>
                    <li>Label icon upload</li>
                </ul>
                <br/>
                            
            <h3>Current Development:</h3>
                <ul>
                    <li>LABELS</li>
                </ul>
                <br/>
            
            <h3>Points of Pride:</h3>
                <ul>
                    <li>Photoshop header from screenshot of google font</li>
                    <li>Full Stack w/ Firebase | React | CSS | JS</li>
                    <li>Minimal imports</li>
                </ul>
                <br/>
            
            <h3>Future Goals:</h3>
                <ul>
                    <li>Mobile Friendly</li>
                    <li>Consult UX on forms, cards & dashboard</li>
                    <li>Info/Help Modal to explain process</li>
                    <li>Fix double click on example extras</li>
                </ul>
                <br/>
            
            <h3>Ultimate Goal:</h3>
                <ul>
                    <li>eCommerce</li>
                </ul>
                <br/> 
        </div>
    </div>  

export default About