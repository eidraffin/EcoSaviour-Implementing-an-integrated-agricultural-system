#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);
const int soilsensor_pin = A0;	
const int gaspin=A1;
const int trigPin = 5;
const int echoPin = 6;
int distance;
long duration;
void setup() {
//lcd
  lcd.init(); // initialize the lcd
  lcd.backlight();  
  Serial.begin(115200);	
  //soil
  pinMode(2,OUTPUT);
  digitalWrite(2,LOW);
  pinMode(3,OUTPUT);
  digitalWrite(3,LOW);

  //gas
  pinMode(gaspin,INPUT);
  pinMode(13,OUTPUT);
  //sonar
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT);
  digitalWrite(13,LOW);

  

}

void loop() {
  lcd.print("why");
  float moisture_percentage;
  float gasvalue;
  int soilsensor_analog;
  soilsensor_analog = analogRead(soilsensor_pin);
  moisture_percentage = ( 100 - ( (soilsensor_analog/1023.00) * 100 ) );
  //Serial.print("Moisture Percentage = ");
  //Serial.print(moisture_percentage);
  //Serial.print("%\n\n");
  //Serial.print("Moisture Percentage = " + String(moisture_percentage) + "\n");
  if(moisture_percentage<20){
    lcd.print("Need Water.");
    delay(1000) ;
    lcd.clear();
    lcd.print("Watering plants.");
    lcd.clear();
    digitalWrite(2,HIGH);
 }
  else if(moisture_percentage>55)
  {
    digitalWrite(2,LOW);
    lcd.print("Stop Watering.");
    delay(1000);
    lcd.clear();
  }
  //=============================================================================


  gasvalue=analogRead(gaspin);
//Serial.print("Gas value=");
//Serial.print(gasvalue);
//Serial.print("Gas value=" + String(gasvalue)+ "\n");
if (analogRead(gaspin) > 310) {
      lcd.print("Toxic Gas alert!");
      delay(1000);
      lcd.clear();
    
   }
   //========================================================================
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2;
  //Serial.print("Distance: ");
  //Serial.println(distance);
  Serial.println("Moisture Percentage = " + String(moisture_percentage) + "|  Gas value= " + String(gasvalue)+ + "|  Distance= " + String(distance)+ "\n");
  if(distance<10 && distance>0){

     digitalWrite(13,HIGH);
     lcd.print("Intruder Alert!");
      delay(1000);
      lcd.clear();
   } else {
       digitalWrite(13,LOW);
   }
  
}
