import org.json.simple.*;

public class EventHandler {

  public EventHandler() {
    // TODO Auto-generated constructor stub
  }

  public String handle(String event){
    JSONObject eventObj = (JSONObject) JSONValue.parse(event);

    switch (eventObj.get("event").toString()){

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
      return("{\"event\":\"createRoom\",\"result\":true}");
    case "validateUserName":
      return "{\"event\":\"validateUserName\",\"roomResult\":true,\"needsPassword\":true,\"passwordResult\":true,\"userNameResult\":true}";

    }

    return("{\"event\":\"validateRoom\",\"result\":true}");
  }

  //for testing
  public static void main(String[] args) {

    String teststr = new String("{\"tese\"}");
    EventHandler meself = new EventHandler();
    meself.handle(teststr);

  }

}
