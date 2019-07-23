import React, { Component } from 'react'

// make buttons that change color when selected and also update form
// onClick toggles true/false
// each "click" is essentially an option to be selected


export default class Form extends Component {
    state = {
        chili: {
            name: "ghost",
            heat: 10,
            info: "this is super hot",
            price: 600
        },
        spice: {
            name: "indian",
            heat: 1,
            items: ["indian curry", "cumin"],
            price: 500,
        },
        extra: {
            heat: 0,
            price: 0,
        },
        vinegar: {
            name: "white",
            info: "strong",
            price: 400,
        },
    }

    setToggle=(e, value) => {
        console.log("click setToggle")
        console.log(e.target, "<------ e.target setToggle")
        console.log(e.target.name, "<------ e.target.name setToggle")
        console.log(e.target.value, "<------ e.target.value setToggle")
        console.log(value, "<---value")
        this.setState({
            [e.target.name]: value
        })
        console.log(this.state)
    }
    // toggle = e => {
    //     e.currentTarget.classList.toggle('toggleOn');
    // }
    render(){
        // const { setToggleApp, submitForm } = this.props
        const {chili, spice, vinegar, extra} = this.state
        const { chilis, spices, extras, vinegars, submitForm } = this.props

          

        const chiliList = chilis.map((chili, i) => {
            return(

                        <section key={i}>
                            <button name="chili" value={chili} className={(this.state.chili.name === chili.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, chili)}} type="button"></button>
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
                        <button name="spice" value={spice} className={(this.state.spice.name === spice.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, spice)}} type="button"></button>
                    <section><h3>{spice.name}</h3><ul>{spiceItems}</ul></section>
                </section>
            )

        })
        const extraList = extras.map((extra, i) => {
            return (
                <section key={i}>
                    <button name="extra" className={(this.state.extra.name === extra.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, extra)}} type="button"></button>
                    <section><h3>{extra.name}</h3></section>

                </section>
            )
        })
        const vinegarList = vinegars.map((vinegar, i) => {
            return (
                <section key={i}>
                    <button name="vinegar" className={(this.state.vinegar.name === vinegar.name? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, vinegar)}} type="button"></button>
                    <section><h3>{vinegar.name}</h3></section>

                </section>
            )
        })







       
        
        return(
            <>
            <h1>Price: ${(chili.price + spice.price + vinegar.price + extra.price)/100}.00</h1>
            <h1>Heat Factor: {chili.heat + spice.heat + extra.heat}</h1>
            <h1>Create Your Own Hot Sauce Here</h1>
            <form onSubmit={(e) => { submitForm(e, this.state)}}>
            <button type="submit">SAVE</button>
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