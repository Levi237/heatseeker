import React, { Component } from 'react'

// make buttons that change color when selected and also update form
// onClick toggles true/false
// each "click" is essentially an option to be selected


export default class Form extends Component {
    state = {
        chilis: [],
        // //chiliSection
        // chili1: false,   //setToggle
        // chili2: false,   //setToggle
        // chili3: false,   //setToggle
        // chili4: false,   //setToggle
        // //spiceSection
        // spice1: false,
        // spice2: false,
        // spice3: false,
        // spice4: false,
        // spice5: false,
        // //extraSection
        // extra1: false,
        // extra2: false,
        // extra3: false,
        // extra4: false,
        // extra5: false,
        // //vinegarSection
        // vinegar1: false,
        // vinegar2: false,
        // vinegar3: false,
        // vinegar4: false,
        // vinegar5: false,

    }

    setToggle=(e) => {
        console.log("click setToggle")
        console.log(e.target, "<------ e.target setToggle")
        this.setState({
            [e.target.name]: !this.state.chilis[e.target.name]
        })
    }
    // toggle = e => {
    //     e.currentTarget.classList.toggle('toggleOn');
    // }
    render(){
        const { setToggleApp, submitForm } = this.props
        const { chilis, spices, extras, vinegars } = this.props

        // const { chili1, chili2, chili3, chili4, spice1, spice2, spice3, spice4, spice5, extra1, extra2, extra3, extra4, extra5, vinegar1, vinegar2, vinegar3, vinegar4, vinegar5 } = this.state
        

        const chiliList = chilis.map((chili, i) => {
            console.log(chili)
            return(

                        <section key={i}>
                            <button name="select" className={(chili.select ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {setToggleApp(e)}} type="button" value={chili.select}></button>
                            <section><img src="red-pin.png" alt="placeholder"/><br/>{chili.name}</section>
                        </section>


            )
        })
        const spiceList = spices.map((spice, i) => {
            const spiceItems= spice.items.map((item, k) => {
                return (
                    <li key={k}>{item}</li>
                )
            })
                return (
                    <section key={i}>
                        <button name="select" className={(spice.select ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                    <section><h3>{spice.name}</h3><ul>{spiceItems}</ul></section>
                </section>
            )

        })
        const extraList = extras.map((extra, i) => {
            return (
                <section key={i}>
                    <button name="select" className={(extra.select ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                    <section><h3>{extra.name}</h3></section>

                </section>
            )
        })
        const vinegarList = vinegars.map((vinegar, i) => {
            return (
                <section key={i}>
                    <button name="select" className={(vinegar.select ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                    <section><h3>{vinegar.name}</h3></section>

                </section>
            )
        })

        // const alertList = closureList.map((park, i) => {
        //     return (
                                
        //         <section className="alertList" key={i}>
        //             <form className="mapBtn" onSubmit={(map) => this.showOnMap(map, park)}>
        //                 <button type="submit" onClick={handleSetMap} value={park.latLong}>Map</button>
        //             </form>
        //             <div className="title" onClick={this.toggle}>
        //                 <div>
        //                     <strong>
        //                         <div className="currentlyClosed">CURRENTLY CLOSED</div>
        //                         <div>{park.fullName}</div>                            
        //                     <small>
        //                         <a className="npsLink" href={park.url} target="_blank" rel="noopener noreferrer">{park.title}</a>
        //                     </small>
        //                     </strong>
        //                 </div>
        //                 <div className="details">
        //                     {park.description}
        //                 </div>
        //             </div>
        //                 { currentUser && 
        //                 <form className="addBox" onSubmit={(e) => this.doAddAlert(e, park)}>                                 
        //                     <button className={currentUserList.map((check) => check.title === park.title && " selected ")+" alertsButton"} type="submit">Add to List</button>                    
        //                 </form>
        //                 }                
        //         </section>  
        //     )  
        // })
        
        return(
            <>
            <h1>Create Your Own Hot Sauce Here</h1>
            <form onSubmit={submitForm}>
                {/* <button name="click1" className={(click1 ? "toggleOn" : "offBtn")} onClick={(e) => {this.setToggle(e)}} type="button">Button 1</button> */}
                {/* <button name="click2" className={(click2 ? "toggleOn" : "offBtn")} onClick={(e) => {this.setToggle(e)}} type="button">Button 2</button> */}
                <div className="chiliSection">
                    {chiliList}
                </div>
                <div className="spiceSection">
                    {spiceList}
                    {/* <section>
                        <button name="spice1" className={(spice1 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Mex</h3><ul><li>salt</li><li>pepper</li></ul></section>
                    </section>
                    <section>
                        <button name="spice2" className={(spice2 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Louisiana</h3><ul><li>salt</li><li>pepper</li></ul></section>
                    </section>
                    <section>
                        <button name="spice3" className={(spice3 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Thai</h3><ul><li>salt</li><li>pepper</li></ul></section>
                    </section>
                    <section>
                        <button name="spice4" className={(spice4 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Indian</h3><ul><li>salt</li><li>pepper</li></ul></section>
                    </section>
                    <section>
                        <button name="spice5" className={(spice5 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Californian</h3><ul><li>salt</li><li>pepper</li></ul></section>
                    </section> */}
                </div>
                <div className="extraSection">
                {extraList}
                    {/* <section>
                        <button name="extra1" className={(extra1 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Fresh Garlic</h3></section>
                    </section>
                    <section>
                        <button name="extra2" className={(extra2 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Fresh Onion</h3></section>
                    </section>
                    <section>
                        <button name="extra3" className={(extra3 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Extras THREE</h3></section>
                    </section>
                    <section>
                        <button name="extra4" className={(extra4 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Extras FOUR</h3></section>
                    </section>
                    <section>
                        <button name="extra5" className={(extra5 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Extras FIVE</h3></section>
                    </section> */}
                </div>
                <div className="vinegarSection">
                {vinegarList}
                    {/* <section>
                        <button name="vinegar1" className={(vinegar1 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Vinegar ONE</h3></section>
                    </section>
                    <section>
                        <button name="vinegar2" className={(vinegar2 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Vinegar TWO</h3></section>
                    </section>
                    <section>
                        <button name="vinegar3" className={(vinegar3 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Vinegar THREE</h3></section>
                    </section>
                    <section>
                        <button name="vinegar4" className={(vinegar4 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Vinegar FOUR</h3></section>
                    </section>
                    <section>
                        <button name="vinegar5" className={(vinegar5 ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e)}} type="button"></button>
                        <section><h3>Vinegar FIVE</h3></section>
                    </section> */}
                </div>


                {/* This was with a basic toggle on the classList */}
                {/* <div className="chiliSection">
                    <section>
                        <div name="chili 1" className="chiliBtn" onClick={this.toggle}></div>
                        <section><img src="red-pin.png" alt="placeholder"/><br/>Chili 1</section>
                    </section>
                    <section>
                        <div name="chili 2" className="chiliBtn" onClick={this.toggle}></div>
                        <section><img src="green-pin.png" alt="placeholder"/><br/>Chili 2</section>
                    </section>
                </div>
                <div className="spiceSection">
                    <section>
                        <div name="spice 1" className="spiceBtn" onClick={this.toggle}></div>
                        <section><img src="red-pin.png" alt="placeholder"/><br/>Spice 1</section>
                    </section>
                    <section>
                        <div name="spice 2" className="spiceBtn" onClick={this.toggle}></div>
                        <section><img src="green-pin.png" alt="placeholder"/><br/>Spice 2</section>
                    </section>
                </div> */}
            </form>
            </>
        )
    }
}