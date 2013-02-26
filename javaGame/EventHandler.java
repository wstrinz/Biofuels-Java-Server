import org.json.simple.*;

public class EventHandler {

	public EventHandler() {
		// TODO Auto-generated constructor stub
	}

	public String handle(String event){
		JSONObject eventObj = (JSONObject) JSONValue.parse(event);

		System.out.println("got " + event);
    //+ eventObj.get("event")
		return("{\"event\":\"validateRoom\",\"result\":true}");
	}

  //for testing
  public static void main(String[] args) {
    String teststr = new String("{\"tese\"}");
    EventHandler meself = new EventHandler();
    meself.handle(teststr);
  }

}
