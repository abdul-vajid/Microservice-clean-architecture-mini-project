import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('products')
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    category: string;

    @Column({
        nullable: true
    })
    madeIn: string;

    @Column({
        default: 1,
    })
    stock: number;

    @Column({
        type: "numeric"
    })
    amount: number;
}
