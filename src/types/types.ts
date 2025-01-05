export interface TrendingPost {
id: string;
title: string;
description: string;
likes: number;
comments: Comment[];
createdAt: Date;

}

export interface Comment {
id: string;
user: {
    email: string;
}
text: string;
createdAt: Date;
}