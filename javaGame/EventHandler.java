import java.util.ArrayList;
import java.util.HashMap;

import org.json.simple.*;

public class EventHandler {

  private HashMap<String, Game> games;

  public EventHandler() {
    // TODO Auto-generated constructor stub
    games = new HashMap<>();
  }

  public String[] handle(String event){
    ArrayList<String> replies = new ArrayList<>();
    JSONObject eventObj = (JSONObject) JSONValue.parse(event);

    Integer clientId = Integer.parseInt((String) eventObj.get("clientID"));

    switch (eventObj.get("event").toString()){

    case "validateRoom":
      if(games.get(eventObj.get("roomName")) != null){
        replies.add("{\"event\":\"validateRoom\",\"result\":false}");
      }
      else{
        replies.add("{\"event\":\"validateRoom\",\"result\":true}");
      }
    break;

    case "changeSettings":
      replies.add(event);
    break;

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
        replies.add("{\"event\":\"createRoom\",\"result\":false}");
      }
      games.put((String) eventObj.get("roomName"), new Game((String) eventObj.get("roomName")));
      replies.add (buildJson("createRoom","result",true));
      //replies.add("{\"event\":\"createRoom\",\"result\":true}");
    break;

    case "validateUserName":
      Boolean roomResult = roomValid((String) eventObj.get("roomName")); //games.get(eventObj.get("roomName")) != null;
      Boolean nameResult = false;
      Boolean needsPass = false;
      Boolean correctPass = false;
      if(roomResult){
        nameResult = !eventObj.get("userName").equals("") && !farmerExistsInRoom((String)eventObj.get("userName"), (String) eventObj.get("roomName"));//!games.get(eventObj.get("roomName")).hasFarmer((String) eventObj.get(eventObj.get("userName")));
        needsPass = games.get(eventObj.get("roomName")).hasPassword();
        if(needsPass){
          correctPass = games.get(eventObj.get("roomName")).getPassword().equals(eventObj.get("password"));
        }
      }
      replies.add(buildJson("validateUserName","roomResult",roomResult,"needsPassword",needsPass,
          "passwordResult",correctPass,"userNameResult",nameResult));
      //replies.add "{\"event\":\"validateUserName\",\"roomResult\":"+ roomResult + ",\"needsPassword\":false,\"passwordResult\":false,\"userNameResult\":"+nameResult +"}";
    break;

    case "joinRoom":
      //    {"event":"joinRoom","roomName":"a","password":"","userName":"d"}
      if(roomExists((String) eventObj.get("roomName")) &&
      !farmerExistsInRoom((String) eventObj.get("userName"),(String) eventObj.get("roomName"))){
        games.get(eventObj.get("roomName")).addFarmer((String) eventObj.get("userName"));
        replies.add(buildJson("joinRoom","result",true,"roomName",(String) eventObj.get("roomName")));
        //replies.add("{\"event\":\"joinRoom\",\"result\":true}");
      }
      else
        replies.add(buildJson("joinRoom","result",false));
    break;
    default:
//      replies.add("{\"event\":\"validateRoom\",\"result\":true}");
    }
    String[] ret = new String[replies.size()];
    replies.toArray(ret);
    return ret;
  }

  private boolean roomValid(String room){
    return (room.length()>0 && roomExists(room));
  }

  private boolean roomExists(String room){
    return games.get(room) != null;
  }

  private boolean farmerExistsInRoom(String farmer, String room){
    if(roomExists(room)){

      return games.get(room).hasFarmer(farmer);
    }
    return false;
  }

  private String buildJson(String event, Object ... arguments){
    String start = "{\"event\":\""+event+"\",";
    StringBuilder sb = new StringBuilder(start);
    if(!(arguments.length % 2 == 0)){
      System.out.println("bad argument list; not an even number");
      return (sb.append("}")).toString();
    }
    for(int i = 0;i<arguments.length;i+=2){
      String str1 = arguments[i].toString();
      if(arguments[i] instanceof String){
        str1 = "\"" + arguments[i] + "\"";
      }
      String str2 = arguments[i+1].toString();
      if(arguments[i+1] instanceof String){
        str2 = "\"" + arguments[i+1] + "\"";
      }
      sb.append(str1);
      sb.append(":");
      sb.append(str2);

      if(i+2 == arguments.length){
        sb.append("}");
      }
      else{
        sb.append(",");
      }
    }
    return(sb.toString());

  }

  //for testing
  public static void main(String[] args) {

    String teststr = new String("{\"event\":\"createRoom\",\"roomName\":\"room\"}");
    EventHandler meself = new EventHandler();
    meself.handle(teststr);

  }

}
