import React from 'react';
import "./ContactPost.css";
// import $ from 'jquery';



class ContactPost extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            name:this.props.name,
            number:this.props.number,
            bgcolor:this.getRandomColor(),
            expand:false,
            edit:false,
            newName:this.props.name,
            newNum:this.props.number,

        }

    }
    getRandomColor(){
        var list=["lightskyblue","red","gold","lightgreen"]//"peru","pink","purple","white","aqua",
        var i=Math.floor(Math.random() * list.length);
        // this.setState({
        //     bgcolor:list[i]
        // });
        return list[i]
    }
    expand(){
        this.setState({
            expand:!this.state.expand,
        })
    }
    edit(){
        this.setState({
            edit:!this.state.edit,
        })
    }
    refresh(){
        
    }
    async save(){

        if(this.state.name!=this.state.newName || this.state.number!=this.state.newNum)
        {
            this.delete(1)
            console.log("in save fn");
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.state.newName,number:this.state.newNum})
            };
            //   console.log('/api/contact/'+props.user)
            await fetch('/api/contact/'+this.props.username, requestOptions)
                .then(response => console.log(response.json()))
            
        }
        
            this.props.setcontacts(null)
        
        

    }
    async delete(val){
        console.log("in del fn")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.name,number:this.state.number})
          };
          console.log('/api/contact/deleteContact/'+this.props.username)
          await fetch('/api/contact/deleteContact/'+this.props.username, requestOptions)
              .then(response => console.log(response.json()))
            
            if(val==0)
            {
                console.log("val = 0")
                this.props.setcontacts(null)
            }

    }
    // setRandomColor() {
    //     $("#Dp").css("background-color", this.getRandomColor());
    //   }
    // <img src="https://img.icons8.com/metro/26/000000/gender-neutral-user.png"/>
    render(){
        return(
            <>
                {!this.state.edit&&
                    <button id="PostButton" onClick={()=>this.expand()}>
                        <div className="ContactPost">
                            <div className="ContactImage"><img id="Dp" style={{"backgroundColor":this.state.bgcolor}} src="https://img.icons8.com/pastel-glyph/64/000000/person-male.png"/></div>
                            <div className="ContactName">{this.state.name}   {this.state.expand && <div className="NumberDisp">{this.state.number}</div>}</div>
                            <div className="Edit"><button id="EditButton" onClick={()=>this.edit()}><img id="EditIcon" src="https://img.icons8.com/ios-glyphs/30/000000/edit.png"/></button></div>
                        </div>
                    
                    </button>
                }
                {this.state.edit &&
                    <div className="Details"> 
                        <div className="EditDp"><img id="DpEdit" style={{"backgroundColor":this.state.bgcolor}} src="https://img.icons8.com/pastel-glyph/64/000000/person-male.png"/></div>
                        <div className="EditName">Name:<input id="EditInput" type='text' defaultValue={this.state.name} onChange={(e)=>this.setState({newName:e.target.value})}></input></div>
                        <div className="EditNumber">Number:<input id="EditInput" type='text' defaultValue={this.state.number} onChange={(e)=>this.setState({newNum:e.target.value})}/></div>
                        <div className="EditButtons">
                            <div className="EditButtDiv"><button id="buttoneSave" onClick={()=>this.save()}><img id="imge" src="https://img.icons8.com/cute-clipart/64/000000/save.png"/><p>Save</p></button></div>
                            <div className="EditButtDiv"><button id="buttone" onClick={()=>this.setState({edit:!this.state.edit})}><img id="imge"src="https://img.icons8.com/cute-clipart/64/000000/file-delete.png"/><p>Discard</p></button></div>
                            <div className="EditButtDiv"><button id="buttoneDel" onClick={()=>this.delete(0)}><img id="imge"src="https://img.icons8.com/cute-clipart/64/000000/delete-forever.png"/><p>Delete</p></button></div>
                        </div>                      
                    </div>
                }
            </>
        )

    }
    
}

export default ContactPost