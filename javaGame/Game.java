import java.util.ArrayList;


public class Game {

  private final String roomName;

  private ArrayList<String> players;

  public Game(String name) {
    roomName = name;
    players = new ArrayList<>();
    // TODO Auto-generated constructor stub
  }

  public String getRoomName() {
    return roomName;
  }

  public boolean hasFarmer(String name) {
    // TODO Auto-generated method stub
    return players.contains(name);
  }

  public void addFarmer(String newPlayer) {
    // TODO Auto-generated method stub
    players.add(newPlayer);
  }


}
