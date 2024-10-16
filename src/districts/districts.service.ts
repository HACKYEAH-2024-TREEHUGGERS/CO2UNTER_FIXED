import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Repository} from "typeorm";
import {District} from "./districts.entity";
import {firstValueFrom} from "rxjs";

@Injectable()
export class DistrictsService {
  private readonly API_URL = 'https://krakow.lifeurbangreen.eu/api/krakow/ecosystem_data_district_A_V1';

  constructor(
    @Inject('DISTRICT_REPOSITORY')
    private districtRepository: Repository<District>,
    private readonly httpService: HttpService,
  ) {}

  async #fetchGreenArea(districtId: number): Promise<District> {
    let district = await this.districtRepository.findOneBy({id_district: districtId})

    if (district) {
      return district;
    }

    const apiUrl = `${this.API_URL}?filter={"where":{"id_district":${districtId}}}`;
    const response = await firstValueFrom(this.httpService.get(apiUrl));
    const data = response.data as District[];

    if (!data || data.length === 0) {
      return null;
    }

    district = this.districtRepository.create(data[0]);
    await this.districtRepository.save(district);

    return district;
  }

  async getJordanPercentage(emission: number): Promise<number> {
    const jordanId = 5;
    const jordanData = await this.#fetchGreenArea(jordanId);

    if (!jordanData) {
      throw new Error('Jordan not found');
    }

    const numberOfPlants = jordanData.number_of_plants;
    const coAbsorbed = jordanData.co_absorbed;

    if (numberOfPlants === 0 || coAbsorbed === 0) {
      throw new Error('Invalid Jordan data');
    }

    const treeEfficiency = coAbsorbed / numberOfPlants;
    const treesNeeded = Math.ceil(emission / treeEfficiency);
    return (treesNeeded / numberOfPlants) * 100;
  }
}
