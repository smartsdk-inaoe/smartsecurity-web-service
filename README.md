# Smartsecurity Web Service


## DataModels APIREST Routes


### Public Data Models
**Organization**  
***GET /api/organization*** get all organizations and by attributes <br>
Example : /organization?status=1
***POST /api/organization*** create a new organization <br>
***GET /api/organization/idOrganization*** get an especific organization <br>
***PUT /api/organization/idOrganization***  update an especific organization <br>
***DELETE /api/organization/idOrganization***  update an especific organization <br>

**Zones**  
***GET /api/zone*** get all Zones and by attributes<br>
Example : /zone?status=1&owner=5
***POST /api/zone*** create a new Zone <br>
***GET /api/zone/idZone*** get an especific Zone <br>
***PUT /api/zone/idZone***  update an especific Zone <br>
***DELETE /api/zone/idZone***  update an especific Zone <br>

**Subzones**  
***GET /api/subzone*** get all Subzones and by attributes<br>
***POST /api/subzones*** create a new Subzone <br>
***GET /api/subzone/idSubzone*** get an especific Subzone <br>
***PUT /api/subzone/idSubzone***  update an especific Subzone <br>
***DELETE /api/subzone/idSubzone***  update an especific Subzone <br>

**Road**  
***GET /api/road*** get all Roads and by attributes<br>
***POST /api/road*** create a new Road <br>
***GET /api/road/idRoad*** get an especific Road <br>
***PUT /api/road/idRoad***  update an especific Road <br>
***DELETE /api/road/idRoad***  update an especific Road <br>

**RoadSegment**  
***GET /api/roadSegment*** get all RoadSegments and by attributes<br>
***POST /api/roadSegment*** create a new RoadSegment <br>
***GET /api/roadSegment/idRoadSegment*** get an especific RoadSegment <br>
***PUT /api/roadSegment/idRoadSegment***  update an especific RoadSegment <br>
***DELETE /api/roadSegment/idRoadSegment***  update an especific RoadSegment <br>

**OffStreetParking**  
***GET /api/offStreetParking*** get all OffStreetParkings and by attributes<br>
***POST /api/offStreetParking*** create a new OffStreetParking <br>
***GET /api/offStreetParking/idOffStreetParking*** get an especific OffStreetParking <br>
***PUT /api/offStreetParking/idOffStreetParking***  update an especific OffStreetParking <br>
***DELETE /api/offStreetParking/idOffStreetParking***  update an especific OffStreetParking <br>

### Private Data Models

**DeviceToken**  
***GET /api/device/token*** get all DeviceToken and by attributes<br>
***POST /api/device/token*** create a new DeviceToken <br>
***GET /api/device/token/idDeviceToken*** get an especific DeviceToken <br>
***PUT /api/device/token/idDeviceToken***  update an especific DeviceToken <br>
***DELETE /api/device/token/idDeviceToken***  update an especific DeviceToken <br>

## Especial Services Routes

**Alerts**
***GET /service/alerts/zone/history/:idZone*** get the last 10 alerts on the especified zone<br>
***GET /service/alerts/zone/current/:idZone*** get all the alerts generated since midnight on especified zone<br>
***GET /service/alerts/subzone/history/:idSubzone*** get the last 10 alerts on the especified subzone<br>
***GET /service/alerts/subzone/current/:idSubzone*** get all the alerts generated since midnight on especified subzone<br>

***Devices***

***GET /service/device/zone/:idZone*** get all devices on the especified zone<br>

Especific Params 
Example : /service/device/zone/:idZone?id=Smartphone_1828273&type=Device&owner=Daniel%20Torres

***GET /service/device/subzone/:idSubzone*** get all devices on the especified subzone<br>



## Crate API Routes (Time Services)

