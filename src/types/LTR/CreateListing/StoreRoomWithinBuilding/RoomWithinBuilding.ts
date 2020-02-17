export interface RoomWithinBuildingReq {
  apartment_building_id: number,
  room_number: string,
  floor: string
}

export interface AddToBuildingReq {
  apartment_building_id: number,
  list_long_term_room: RoomToBuildingReq[],
}

export interface RoomToBuildingReq {
  id: number,
  room_number: string,
  floor: string
}
