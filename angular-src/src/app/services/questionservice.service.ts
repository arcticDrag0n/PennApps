import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  public name : string;
  public uid : string;

  constructor(private http : Http) { }

  // Need the actual links to send the requests to

  askQuestion(questionObj){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post("http://ec2-34-229-153-170.compute-1.amazonaws.com/submit.php", questionObj, { headers: headers });
  }

  replyToQuestion(reply){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    var replyObj = {
      "request" : "post",
      "body" : reply,
      "type" : 1,
      "uid" : this.uid,
    }
    return this.http.post("http://ec2-34-229-153-170.compute-1.amazonaws.com/submit.php", replyObj, { headers: headers });
  }

  getQuestionList(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    var reqObj = {
      "request" : "popular"
    }
    return this.http.post("http://ec2-34-229-153-170.compute-1.amazonaws.com/submit.php", reqObj, { headers: headers });
  }

  requestUserInfo(){
    let headers = new Headers();
    var reqObj = {
      "request" : "userData",
      "uid" : "-1"
    };
    headers.append("Content-Type", "application/json");
    return this.http.post('http://ec2-34-229-153-170.compute-1.amazonaws.com/auth.php', reqObj, { headers: headers });
  }

  getGoogleAccLink(){
    let headers = new Headers();
    var reqObj = {
      "request" : "authUrl"
    };
    headers.append("Content-Type", "application/json");
    return this.http.post('http://ec2-34-229-153-170.compute-1.amazonaws.com/auth.php', reqObj, { headers: headers });
  }

  logOut(){
    let headers = new Headers();
    var reqObj = {
      "request" : "logout"
    };
    headers.append("Content-Type", "application/json");
    return this.http.post('http://ec2-34-229-153-170.compute-1.amazonaws.com/auth.php', reqObj, { headers: headers });
  }

  queryUserInfo(uidVal){
    let headers = new Headers();
    var reqObj = {
      "request" : "userData",
      "uid" : uidVal
    }
    console.log("Inside queryUserInfo in the qService");
    console.log(uidVal);
    this.uid = uidVal;
    headers.append("Content-Type", "application/json");
    this.http.post('http://ec2-34-229-153-170.compute-1.amazonaws.com/auth.php', reqObj, { headers : headers }).subscribe(res => {
      if(res.json().success){
        this.name = res.json().name;
      } else {
      }
    });
  }
}
