import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { StoreDto } from './store.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepo: Repository<Store>,
    ) { }

    async create(payload: { store: StoreDto }): Promise<Store> {
        const store = this.storeRepo.create({
            name: payload.store.name,
            description: payload.store.description || '',
            address: payload.store.address || '',
            phone: payload.store.phone || '',
            facebookURL: payload.store.facebookURL || '',
            instagramURL: payload.store.instagramURL || '',
            tiktokURL: payload.store.tiktokURL || '',
        });

        return await this.storeRepo.save(store);
    }

    async findAll(): Promise<Store[]> {
        return await this.storeRepo.find();
    }

    async findOne(id: string): Promise<Store> {
        const store = await this.storeRepo.findOne({ where: { id } });
        if (!store) {
            throw new NotFoundException(`Store with id "${id}" not found`);
        }
        return store;
    }

    async update(id: string, payload: Partial<StoreDto>): Promise<Store> {
        const store = await this.findOne(id);
        Object.assign(store, payload);
        return await this.storeRepo.save(store);
    }

    async delete(id: string): Promise<void> {
        const store = await this.findOne(id);
        await this.storeRepo.remove(store);
    }
}
