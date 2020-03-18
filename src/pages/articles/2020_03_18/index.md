---
title: "[백준] 11050 : 이항 계수 1"
date: "2020-03-18"
layout: post
draft: false
path: "/posts/baekjoons/11050/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 11050번 문제 : 이항 계수 1"
---

# 11050번 : 이항 계수 1

👉 [문제 바로가기](https://www.acmicpc.net/problem/11050)



## 배경 지식
- `이항 계수` : 주어진 크기 집합에서 원하는 개수만큼 **순서없이** 뽑는 조합의 가짓 수

## 푼 방법
이항 계수 공식을 이용했다. :  
$$ \begin{align} \label{x1} \binom{n}{k} = n C k = \frac{n!}{(n-k)!k!} (단, 0 \le k \le n) && \cdots && 1 \end{align} $$

설명이 잘 되어 있는 포스트가 있어 밑에 링크를 걸어 놓았다. 매우 중요한 내용이니 시간이 된다면 꼭 보길 바란다.

## 내 정답 코드 (C++)
~~~c
#include <iostream>

int factorial(int n) {
	if(n == 0 || n == 1)
		return 1;
	return n * factorial(n-1);
}
int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, k;
	
	std::cin >> n >> k;
	
	std::cout << factorial(n) / (factorial(n-k) * factorial(k)) << std::endl;
    
    return 0;
}
~~~

### 참고 사이트
https://shoark7.github.io/programming/algorithm/3-ways-to-get-binomial-coefficients
https://m.blog.naver.com/PostView.nhn?blogId=dalsapcho&logNo=20144677614&proxyReferer=https%3A%2F%2Fwww.google.com%2F