import java.util.ArrayList;


public class Game {

  private final String roomName;
  private final boolean hasPassword;
  private final String password;

  private ArrayList<String> players;

  public Game(String name) {
    roomName = name;
    players = new ArrayList<>();
    hasPassword = false;
    password = "";
    // TODO Auto-generated constructor stub
  }

  public Game(String name, String pass) {
    roomName = name;
    players = new ArrayList<>();
    hasPassword = true;
    password = pass;
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

  public Boolean hasPassword(){
    return hasPassword;
  }

  public String getPassword(){
    return password;
  }

}
