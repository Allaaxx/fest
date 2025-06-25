import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import React from "react";

const categorias = [
	{ categoria: "Decoração", pedidos: 45, porcentagem: 35 },
	{ categoria: "Som", pedidos: 32, porcentagem: 25 },
	{ categoria: "Alimentação", pedidos: 28, porcentagem: 22 },
	{ categoria: "Fotografia", pedidos: 23, porcentagem: 18 },
];

export function AdminAnalyticsContent() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-lg font-semibold text-gray-900">
					Relatórios e Analytics
				</h2>
				<p className="text-sm text-gray-500">Visão completa da plataforma</p>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Receita por Mês</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
							<div className="text-center">
								<BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
								<p className="text-gray-500">
									Gráfico de receita seria exibido aqui
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Categorias Populares</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{categorias.map((item, index) => (
								<div key={index} className="space-y-2">
									<div className="flex justify-between">
										<span className="text-sm font-medium text-gray-900">
											{item.categoria}
										</span>
										<span className="text-sm text-gray-500">
											{item.pedidos} pedidos
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className="bg-red-500 h-2 rounded-full"
											style={{ width: `${item.porcentagem}%` }}
										></div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
