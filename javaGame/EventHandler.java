import java.util.ArrayList;
import java.util.HashMap;

import org.json.simple.*;

public class EventHandler {

  private HashMap<String, Game> games;

  public EventHandler() {
    // TODO Auto-generated constructor stub
    games = new HashMap<>();
  }

  public String handle(String event){
    JSONObject eventObj = (JSONObject) JSONValue.parse(event);

    switch (eventObj.get("event").toString()){


    case "validateRoom":
      if(games.get(eventObj.get("roomName")) != null){
        return("{\"event\":\"validateRoom\",\"result\":false}");
      }
      return("{\"event\":\"validateRoom\",\"result\":true}");

    case "createRoom":
      //uncomment to test concurrency
      /*System.out.print("sleeping\n");
      try {
        Thread.sleep(10000);
      } catch (InterruptedException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
      System.out.print("waking\n");*/
      if(games.get(eventObj.get("roomName")) != null){
        return("{\"event\":\"createRoom\",\"result\":false}");
      }
      games.put((String) eventObj.get("roomName"), new Game((String) eventObj.get("roomName")));
      return("{\"event\":\"createRoom\",\"result\":true}");

    case "validateUserName":
      boolean roomResult = games.get(eventObj.get("roomName")) != null;
      boolean nameResult = false;
      if(roomResult && eventObj.get("userName")!=null){
        nameResult = !games.get(eventObj.get("roomName")).hasFarmer((String) eventObj.get(eventObj.get("userName")));
      }
      return "{\"event\":\"validateUserName\",\"roomResult\":"+ roomResult + ",\"needsPassword\":false,\"passwordResult\":false,\"userNameResult\":"+nameResult +"}";

    case "joinRoom":
      //    {"event":"joinRoom","roomName":"a","password":"","userName":"d"}
      if(games.get(eventObj.get("roomName")) != null && !games.get(eventObj.get("roomName")).hasFarmer((String) eventObj.get(eventObj.get("userName")))){
        games.get(eventObj.get("roomName")).addFarmer((String) eventObj.get(eventObj.get("userName")));
        return("{\"event\":\"joinRoom\",\"result\":true}");
      }
      return("{\"event\":\"joinRoom\",\"result\":false}");

    }

    return("{\"event\":\"validateRoom\",\"result\":true}");
  }

  //for testing
  public static void main(String[] args) {

    String teststr = new String("{\"event\":\"createRoom\",\"roomName\":\"room\"}");
    EventHandler meself = new EventHandler();
    meself.handle(teststr);

  }

}
